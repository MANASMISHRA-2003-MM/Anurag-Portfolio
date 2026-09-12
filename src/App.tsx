import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  return (
    <Router>
      <LenisScroll />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </Router>
  );
}
