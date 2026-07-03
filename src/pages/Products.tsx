import ProductCard from "../components/products/ProductCard";

function Products() {

  const products = [

    {
      name: "Controlador Siemens SINAMICS G120",
      brand: "Siemens",
      category: "Automatización",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22731d8b40",
    },

    {
      name: "Termómetro Digital",

      brand: "Fluke",

      category: "Metrología",

      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },

    {
      name: "Guantes Industriales",

      brand: "3M",

      category: "Seguridad",

      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    },

  ];

  return (

    <section className="products-page">

      <h1>Catálogo de Productos</h1>

      <p>
        Explora nuestra selección de equipos,
        instrumentos e insumos industriales.
      </p>

      <div className="products-grid">

        {products.map((product) => (

          <ProductCard

            key={product.name}

            {...product}

          />

        ))}

      </div>

    </section>

  );
}

export default Products;