<?php

/**
 * Serverseitige Prüfung des Cloudflare-Turnstile-Tokens.
 *
 * Fail-open: Ist Cloudflare nicht erreichbar (Netzwerkfehler, Timeout,
 * unparsebare Antwort), geben wir true zurück – eine verlorene
 * Kundenanfrage wiegt schwerer als eine Spam-Mail, und der Honeypot
 * bleibt als zweite Verteidigungslinie. Nur ein fehlendes oder von
 * Cloudflare abgelehntes Token führt zu false.
 */
function verify_turnstile(string $token): bool
{
    if (TURNSTILE_SITE_KEY === '' || TURNSTILE_SECRET_KEY === '') {
        return true; // Feature deaktiviert (Kill-Switch)
    }
    if ($token === '') {
        return false; // Widget umgangen oder blockiert
    }

    $payload = http_build_query([
        'secret' => TURNSTILE_SECRET_KEY,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $body = false;
    if (function_exists('curl_init')) {
        $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
            CURLOPT_CONNECTTIMEOUT => 5,
        ]);
        $body = curl_exec($ch);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $payload,
                'timeout' => 5,
            ],
        ]);
        $body = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    }

    if ($body === false || $body === '') {
        return true; // Fail-open: Cloudflare nicht erreichbar
    }

    $result = json_decode($body, true);
    if (!is_array($result) || !array_key_exists('success', $result)) {
        return true; // Fail-open: unerwartete Antwort
    }

    return $result['success'] === true;
}

/**
 * Verarbeitung des Kontaktformulars: Validierung und Versand über den
 * Mailserver des Hosts (PHP mail() nutzt den lokalen Sendmail/MTA des Hostings).
 *
 * Gibt ['success' => bool, 'error' => string|null] zurück – Fehlermeldungen
 * sind für die Anzeige an Besucher gedacht (deutsch).
 */
function handle_contact_form(array $post): array
{
    // Honeypot: echte Nutzer lassen dieses unsichtbare Feld leer, Bots füllen es aus.
    // Erfolg vortäuschen, damit Bots keinen Unterschied erkennen.
    if (!empty($post['website'])) {
        return ['success' => true, 'error' => null];
    }

    // Turnstile: Captcha-Token serverseitig prüfen (nach Honeypot, vor Validierung).
    if (!verify_turnstile(trim((string) ($post['cf-turnstile-response'] ?? '')))) {
        return ['success' => false, 'error' => 'Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.'];
    }

    $name = trim((string) ($post['name'] ?? ''));
    $email = trim((string) ($post['email'] ?? ''));
    $phone = trim((string) ($post['phone'] ?? ''));
    $subject = trim((string) ($post['subject'] ?? ''));
    $message = trim((string) ($post['message'] ?? ''));

    $nameLen = mb_strlen($name);
    $subjectLen = mb_strlen($subject);
    $messageLen = mb_strlen($message);

    $valid = $nameLen >= 2 && $nameLen <= 100
        && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
        && mb_strlen($phone) <= 50
        && $subjectLen >= 3 && $subjectLen <= 150
        && $messageLen >= 10 && $messageLen <= 2000;

    if (!$valid) {
        return ['success' => false, 'error' => 'Ungültige Eingaben. Bitte prüfen Sie Ihre Angaben.'];
    }

    $nameHtml = e($name);
    $phoneHtml = $phone !== '' ? e($phone) : '—';
    $subjectHtml = e($subject);
    $messageHtml = e($message);
    $emailHtml = e($email);

    $html = <<<HTML
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1e3a5f; border-bottom: 2px solid #e8740c; padding-bottom: 10px;">
    Neue Kontaktanfrage von {$nameHtml}
  </h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
      <td style="padding: 8px 0;">{$nameHtml}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold;">E-Mail:</td>
      <td style="padding: 8px 0;"><a href="mailto:{$emailHtml}">{$emailHtml}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
      <td style="padding: 8px 0;">{$phoneHtml}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold;">Betreff:</td>
      <td style="padding: 8px 0;">{$subjectHtml}</td>
    </tr>
  </table>
  <h3 style="color: #1e3a5f; margin-top: 20px;">Nachricht:</h3>
  <p style="background: #f8f9fa; padding: 16px; border-radius: 4px; white-space: pre-wrap;">{$messageHtml}</p>
  <p style="color: #999; font-size: 12px; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">
    Diese E-Mail wurde über das Kontaktformular auf ari-maler.ch gesendet.
  </p>
</div>
HTML;

    // Zeilenumbrüche im Betreff entfernen (Header-Injection), Umlaute MIME-kodieren.
    $mailSubject = mb_encode_mimeheader(
        'Kontaktanfrage: ' . preg_replace('/[\r\n]+/', ' ', $subject),
        'UTF-8',
        'B',
        "\r\n"
    );

    // $email ist durch FILTER_VALIDATE_EMAIL geprüft und kann keine Zeilenumbrüche enthalten.
    $headerLines = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . SITE_NAME . ' <' . CONTACT_FROM_EMAIL . '>',
        'Reply-To: ' . $email,
    ];
    if (defined('CONTACT_BCC_EMAIL') && CONTACT_BCC_EMAIL) {
        $headerLines[] = 'Bcc: ' . CONTACT_BCC_EMAIL;
    }
    $headers = implode("\r\n", $headerLines);

    // Envelope-Absender setzen (hilft gegen Spam-Einstufung); falls der Host
    // den -f-Parameter nicht erlaubt, ohne ihn erneut versuchen.
    $sent = @mail(CONTACT_TO_EMAIL, $mailSubject, $html, $headers, '-f' . CONTACT_FROM_EMAIL);
    if (!$sent) {
        $sent = @mail(CONTACT_TO_EMAIL, $mailSubject, $html, $headers);
    }

    if (!$sent) {
        return ['success' => false, 'error' => 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'];
    }

    return ['success' => true, 'error' => null];
}
