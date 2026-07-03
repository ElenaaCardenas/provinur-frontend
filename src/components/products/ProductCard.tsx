type ProductCardProps = {
  image: string;
  name: string;
  brand: string;
  category: string;
};

function ProductCard({
  image,
  name,
  brand,
  category,
}: ProductCardProps) {
  return (
    <div className="product-card">

      <img src={image} alt={name} />

      <div className="product-info">

        <span>{category}</span>

        <h3>{name}</h3>

        <p>{brand}</p>

        <button>Ver detalle</button>

      </div>

    </div>
  );
}

export default ProductCard;