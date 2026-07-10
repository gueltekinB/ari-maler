import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import DienstleistungenPage from './pages/DienstleistungenPage';
import ServicePage from './pages/ServicePage';
import ReferenzenPage from './pages/ReferenzenPage';
import UeberUnsPage from './pages/UeberUnsPage';
import KontaktPage from './pages/KontaktPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';

function App() {
  return (
    <div>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dienstleistungen" element={<DienstleistungenPage />} />
          <Route path="/dienstleistungen/:id" element={<ServicePage />} />
          <Route path="/referenzen" element={<ReferenzenPage />} />
          <Route path="/ueber-uns" element={<UeberUnsPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
