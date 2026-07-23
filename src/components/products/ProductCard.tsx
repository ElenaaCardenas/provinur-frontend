import { Link } from "react-router-dom";

type ProductCardProps = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  available: boolean;
};

function ProductCard({
  slug,
  name,
  brand,
  category,
  image,
  available,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-image">
        <img
          src={image}
          alt={name}
          loading="lazy"
        />

        <span
          className={`product-status ${
            available ? "is-available" : "is-unavailable"
          }`}
        >
          {available ? "Disponible" : "Consultar existencia"}
        </span>
      </div>

      <div className="product-card-content">
        <p className="product-card-meta">
          {brand} · {category}
        </p>

        <h3>{name}</h3>

        <p className="product-card-description">
          Consulta especificaciones técnicas, disponibilidad y opciones de
          suministro.
        </p>

        <Link
          to={`/productos/${slug}`}
          className="product-card-button"
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;