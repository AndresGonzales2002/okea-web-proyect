import React, { useEffect, useState } from "react";
import products from "../data/products.js"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext"; 

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = () => {
      try {
        setProductos(products);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProductos(); 
  }, []);

  const handleImageClick = (id) => {
    navigate(`/producto/${id}`);
  };

  const { agregarAlCarrito } = useCart();

  // ✅ Recibe el producto como argumento
  const handleAgregarAlCarrito = (producto) => {
  if (!producto) return;
  agregarAlCarrito({
    id: producto.id,
    imagen: producto.image,
    nombre: producto.nombre,
    descripcion: producto.descripcion, // 🔹 se agrega la descripción aquí
    precio: producto.precio,
    cantidad: 1,
  });
};


  return (
    <section className="cuadroImagen3 mt-4">
      <main className="collection flex-1 max-w-7xl mx-auto px-4">
        <div className="options flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            TODAS LAS COLECCIONES
          </h2>
          <div className="sort-options">
            <label className="block text-sm text-gray-700">
              Ordenar por:
              <select className="ml-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Relevante</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
              </select>
            </label>
          </div>
        </div>

        {/* 👇 Grid centrada con 5 columnas en pantallas grandes */}
        <div className="products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
  {error ? (
    <p className="error-message text-red-600">{error}</p>
  ) : (
    productos.map((producto) => (
      <div
        key={producto.id}
        className="product-card bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 relative"
      >
        {/* Etiqueta descuento */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
          -50%
        </span>

        {/* Corazón */}
       

        {/* Imagen */}
        <div
          className="bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer"
          onClick={() => handleImageClick(producto.id)}
        >
          <img
            src={producto.image}
            alt={producto.nombre}
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Info */}
        {/* Info */}
<div className="mt-3 flex flex-col gap-2">
  {/* Nombre + Rating en la misma fila */}
  <div className="flex items-center justify-between">
    <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2">
      {producto.nombre}
    </h3>
    <div className="flex items-center text-xs md:text-sm text-red-500 gap-1">
      <span>★ 4.9</span>
    </div>
  </div>

  <p className="text-xs md:text-sm text-gray-500">Wooden Sofa Chair</p>

  {/* Precio */}
  <div className="flex items-center gap-2">
    <p className="text-red-600 font-bold text-sm md:text-base">
      S/ {producto.precio}
    </p>
    <p className="text-gray-400 text-xs md:text-sm line-through">
      S/ 160.00
    </p>
  </div>

  {/* Botón */}
  <button
    type="button"
    className="flex items-center justify-center bg-[#DFE162] text-[#484900] py-2 px-4 mt-3 rounded-xl hover:bg-[#d4d94e] transition text-xs md:text-sm font-medium"
    onClick={() => handleAgregarAlCarrito(producto)}
  >
    🛒 Agregar al carrito
  </button>
</div>

      </div>
    ))
  )}
</div>

      </main>
    </section>
  );
};

export default ProductList;
