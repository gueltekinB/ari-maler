// Kompiliert assets/css/input.css zu assets/css/styles.css.
// Nur lokal nötig (npm run build:css) – das Ergebnis wird eingecheckt.
import { readFile, writeFile } from 'node:fs/promises'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

const input = 'assets/css/input.css'
const output = 'assets/css/styles.css'

const css = await readFile(input, 'utf8')
const result = await postcss([tailwindcss()]).process(css, { from: input, to: output })
await writeFile(output, result.css)
console.log(`${output} geschrieben (${(result.css.length / 1024).toFixed(1)} kB)`)
