import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import DieselLab from './pages/DieselLab';
import Metrology from './pages/Metrology';
import SafetySupplies from './pages/SafetySupplies';

function App() {
  return (
    <BrowserRouter>
  <Navbar />

  <main className="page-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/laboratorio-diesel" element={<DieselLab />} />
      <Route path="/metrologia" element={<Metrology />} />
      <Route path="/insumos-seguridad" element={<SafetySupplies />} />
    </Routes>
  </main>
  <Footer />
</BrowserRouter>
  );
}

export default App;