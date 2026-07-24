import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import DieselLab from "./pages/DieselLab";
import Metrology from "./pages/Metrology";
import SafetySupplies from "./pages/SafetySupplies";
import ProductDetail from "./pages/ProductDetail";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminServices from "./pages/admin/AdminServices";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminQuotes from "./pages/admin/AdminQuotes";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contact />} />
          <Route
            path="/laboratorio-diesel"
            element={<DieselLab />}
          />
          <Route
            path="/metrologia"
            element={<Metrology />}
          />
          <Route
            path="/insumos-seguridad"
            element={<SafetySupplies />}
          />
          <Route
            path="/productos/:slug"
            element={<ProductDetail />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          element={<ProtectedRoute />}
        >
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<AdminServices />}
            />

            <Route
              path="servicios"
              element={<AdminServices />}
            />

            <Route
              path="productos"
              element={<AdminProducts />}
            />

            <Route
              path="cotizaciones"
              element={<AdminQuotes />}
            />
          </Route>
        </Route>

        <Route
          path="/*"
          element={<PublicLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;