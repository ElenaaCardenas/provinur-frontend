import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import "../styles/product-detail.css";

function ProductDetail() {
  const { slug } = useParams();

  const product = products.find(
    (currentProduct) => currentProduct.slug === slug,
  );

  const [selectedImage, setSelectedImage] = useState(
    product?.images[0] ?? "",
  );

  if (!product) {
    return <Navigate to="/productos" replace />;
  }

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">
        <nav className="product-breadcrumb">
          <Link to="/productos">Productos</Link>

          <span>/</span>

          <span>{product.name}</span>
        </nav>

        <section className="product-detail-main">
          <div className="product-gallery">
            <div className="product-main-image">
              <img
                src={selectedImage}
                alt={product.name}
              />
            </div>

            {product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={
                      selectedImage === image
                        ? "product-thumbnail active"
                        : "product-thumbnail"
                    }
                    onClick={() => setSelectedImage(image)}
                    aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} vista ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <p className="product-detail-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            <div className="product-detail-brand">
              <span>Marca</span>
              <strong>{product.brand}</strong>
            </div>

            <span
              className={`product-detail-status ${
                product.available
                  ? "is-available"
                  : "is-unavailable"
              }`}
            >
              {product.available
                ? "Disponible"
                : "Consultar disponibilidad"}
            </span>

            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-detail-actions">
              <Link
                to="/contacto"
                state={{
                productName: product.name,
                }}
                className="product-quote-button"
               >
              Solicitar cotización
              </Link>

              {product.technicalSheet && (
                <a
                  href={product.technicalSheet}
                  target="_blank"
                  rel="noreferrer"
                  className="product-sheet-link"
                >
                  Ficha técnica
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="product-specifications">
          <div className="product-specifications-heading">
            <span>Información del producto</span>
            <h2>Características principales</h2>
          </div>

          <ul>
            {product.features.map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default ProductDetail;