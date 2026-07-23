import { useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";
import "../styles/products.css";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedAvailability, setSelectedAvailability] =
    useState("Todas");
  const [selectedFeature, setSelectedFeature] = useState("Todas");
  const [sortBy, setSortBy] = useState("name-asc");

  const categories = [
    "Todas",
    ...Array.from(
      new Set(products.map((product) => product.category)),
    ),
  ];

  const brands = [
    "Todas",
    ...Array.from(
      new Set(products.map((product) => product.brand)),
    ),
  ];

  const features = [
    "Todas",
    ...Array.from(
      new Set(
        products.flatMap((product) => product.features),
      ),
    ),
  ];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        normalizedSearch === "" ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(normalizedSearch),
        );

      const matchesCategory =
        selectedCategory === "Todas" ||
        product.category === selectedCategory;

      const matchesBrand =
        selectedBrand === "Todas" ||
        product.brand === selectedBrand;

      const matchesAvailability =
        selectedAvailability === "Todas" ||
        (selectedAvailability === "Disponibles" &&
          product.available) ||
        (selectedAvailability === "No disponibles" &&
          !product.available);

      const matchesFeature =
        selectedFeature === "Todas" ||
        product.features.includes(selectedFeature);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesAvailability &&
        matchesFeature
      );
    });

    return [...result].sort((firstProduct, secondProduct) => {
      switch (sortBy) {
        case "name-desc":
          return secondProduct.name.localeCompare(
            firstProduct.name,
          );

        case "recent":
          return (
            new Date(secondProduct.createdAt).getTime() -
            new Date(firstProduct.createdAt).getTime()
          );

        case "available-first":
          return (
            Number(secondProduct.available) -
            Number(firstProduct.available)
          );

        case "name-asc":
        default:
          return firstProduct.name.localeCompare(
            secondProduct.name,
          );
      }
    });
  }, [
    search,
    selectedCategory,
    selectedBrand,
    selectedAvailability,
    selectedFeature,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("Todas");
    setSelectedBrand("Todas");
    setSelectedAvailability("Todas");
    setSelectedFeature("Todas");
    setSortBy("name-asc");
  };

  return (
    <main className="products-page">
      <div className="products-container">
        <header className="products-header">
          <div>
            <span>Catálogo</span>
            <h1>Productos</h1>
          </div>

          <p>
            Explora nuestro catálogo de soluciones, equipos e
            insumos para la industria.
          </p>
        </header>

        <section
          className="products-filters"
          aria-label="Filtros del catálogo"
        >
          <div className="filter-group filter-search">
            <label htmlFor="product-search">
              Buscar por texto
            </label>

            <input
              id="product-search"
              type="search"
              placeholder="Nombre, marca, modelo o característica"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">
              Categoría
            </label>

            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="brand-filter">
              Marca
            </label>

            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={(event) =>
                setSelectedBrand(event.target.value)
              }
            >
              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="availability-filter">
              Disponibilidad
            </label>

            <select
              id="availability-filter"
              value={selectedAvailability}
              onChange={(event) =>
                setSelectedAvailability(event.target.value)
              }
            >
              <option value="Todas">Todas</option>
              <option value="Disponibles">
                Disponibles
              </option>
              <option value="No disponibles">
                No disponibles
              </option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="feature-filter">
              Características
            </label>

            <select
              id="feature-filter"
              value={selectedFeature}
              onChange={(event) =>
                setSelectedFeature(event.target.value)
              }
            >
              {features.map((feature) => (
                <option
                  key={feature}
                  value={feature}
                >
                  {feature}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        </section>

        <section className="products-results-bar">
          <p>
            <strong>{filteredProducts.length}</strong>{" "}
            {filteredProducts.length === 1
              ? "producto encontrado"
              : "productos encontrados"}
          </p>

          <div className="products-sort">
            <label htmlFor="sort-products">
              Ordenar por:
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              <option value="name-asc">
                Nombre A-Z
              </option>
              <option value="name-desc">
                Nombre Z-A
              </option>
              <option value="recent">
                Más recientes
              </option>
              <option value="available-first">
                Disponibles primero
              </option>
            </select>
          </div>
        </section>

        {filteredProducts.length > 0 ? (
          <section className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.brand}
                category={product.category}
                image={product.image}
                available={product.available}
              />
            ))}
          </section>
        ) : (
          <section className="products-empty">
            <h2>No encontramos productos</h2>

            <p>
              Prueba con otros términos o limpia los filtros
              seleccionados.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

export default Products;