
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main><Home /></main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
