import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import products from "../data/products.js";
import { useCart } from "./CartContext.jsx";

const DetailsProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 necesario para redirigir
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCart();

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({
        id: producto.id,
        imagen: producto.image,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad, // 👈 ahora se usa el valor del estado
      });
    }
  };

  

  const [tabActivo, setTabActivo] = useState("descripcion");

  
  const handleDisminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1); // no deja ir por debajo de 1
  };

  const handleAumentar = () => {
    setCantidad(cantidad + 1);
  };

  useEffect(() => {
    try {
      const encontrado = products.find((p) => p.id === parseInt(id));
      if (encontrado) setProducto(encontrado);
      else setError("Producto no encontrado");
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  if (error) {
    return <div className="text-red-600 font-medium p-4">Error: {error}</div>;
  }
   const productosSimilares = products.filter((p) => p.id !== parseInt(id));


  return (
    <div className="w-full max-w-8xl mx-auto px-12 pt-20 pb-8">
      {producto ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Miniaturas */}
          <div className="flex md:flex-col gap-2 md:col-span-1">
            {[...Array(4)].map((_, idx) => (
              <img
                key={idx}
                src={producto.image}
                alt={producto.nombre}
                className="w-20 h-20 object-cover rounded-lg border hover:border-indigo-500 cursor-pointer"
              />
            ))}
          </div>

          {/* Imagen principal */}
          <div className="md:col-span-6 flex items-center justify-center">
            <img
              src={producto.image}
              alt={producto.nombre}
              className="w-full max-w-lg h-auto object-contain rounded-2xl shadow-md border"
            />
          </div>

          {/* Info del producto */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-gray-800">{producto.nombre}</h1>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-500 text-sm">110 opiniones</span>
            </div>

            {/* Precio */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-600">
                  S/ {producto.precio}
                </span>
                <span className="text-gray-400 line-through">S/ 200</span>
              </div>

              <div className="flex gap-4 mt-3">
                <span className="text-[12px] text-gray-600 underline cursor-pointer">
                  cuotas sin interés
                </span>
                <span className="text-[12px] text-gray-600 underline cursor-pointer">
                  stock disponible
                </span>
              </div>
            </div>

            {/* Colores */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">Colores</p>
              <div className="flex gap-2">
                <span className="w-6 h-6 bg-blue-700 rounded-full border cursor-pointer"></span>
                <span className="w-6 h-6 bg-black rounded-full border cursor-pointer"></span>
                <span className="w-6 h-6 bg-purple-300 rounded-full border cursor-pointer"></span>
              </div>
            </div>

            {/* Tamaño */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">Tamaño</p>
              <div className="flex gap-2">
                {["64 GB", "128 GB", "256 GB"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 hover:border-indigo-500 hover:text-indigo-600 hover:bg-gray-200 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">Cantidad</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDisminuir}
                  className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-2">{cantidad}</span>
                <button
                  onClick={handleAumentar}
                  className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón principal */}
            <div className="flex gap-3 w-full">
              <button
                className="flex-1 max-w-sm inline-flex items-center justify-center px-6 py-2 rounded-2xl bg-[#DFE162] text-[#484900] font-medium hover:bg-[#d4d94e] transition shadow-md"
                onClick={handleAgregarAlCarrito}
              >
                🛒 Agregar al carrito
              </button>

              <button className="w-10 h-10 rounded-full bg-[#DFE162] text-[#484900] font-bold text-lg hover:bg-[#d4d94e] transition shadow-md flex items-center justify-center">
                +
              </button>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-600 mt-4">
              <p>🚚 Envío estándar gratis</p>
              <p>⚡ Envío expreso S/7.00</p>
              <p>🔄 Política de devoluciones gratis</p>
              <p>📦 Entregas a tiempo</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-600">Producto no encontrado</div>
      )}

      {/* 🔹 Sección de Información del producto */}
       <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de producto:</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTabActivo("descripcion")}
            className={`px-4 py-2 border rounded-lg font-medium text-sm ${
              tabActivo === "descripcion"
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Descripción
          </button>
          <button
            onClick={() => setTabActivo("especificaciones")}
            className={`px-4 py-2 border rounded-lg font-medium text-sm ${
              tabActivo === "especificaciones"
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Especificaciones técnicas
          </button>
        </div>

        {/* Contenido dinámico */}
        {tabActivo === "descripcion" && (
          <div className="text-gray-700 text-sm leading-relaxed mt-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* Columna Izquierda */}
    <div>
      <h3 className="font-semibold text-gray-800 mb-2">
        GAP – Abrigo casual para mujer
      </h3>
      <p>
        Este abrigo para mujer está hecho de tela suave, transpirable y de secado rápido,
        que absorbe la humedad de tu piel. Diseñado con tapeta y cuello clásico, se puede
        utilizar como ropa semielegante y casual cuando hay eventos.
      </p>
      <p className="mt-2">
        Costuras planas y cuello sin etiqueta que reducen las rozaduras y aumentan la
        comodidad. Corte delgado muestra tu atractiva figura. <br />
        UPF 50+ protege tu piel y cuello de los rayos nocivos del sol.
      </p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Suave</li>
        <li>Ligera</li>
        <li>Secado rápido</li>
      </ul>
    </div>

    {/* Columna Centro */}
    <div>
      <h3 className="font-semibold text-gray-800 mb-2">Detalles de producto:</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          Tejido suave y transpirable que absorbe la humedad de tu piel, respira libremente y se seca rápidamente para una comodidad fresca.
        </li>
        <li>UPF 50+ protege tu piel y cuello de los rayos nocivos del sol.</li>
        <li>
          Diseñado con solapa clásica de 4 botones y cuello, lo que hace que sea más ajustada.
        </li>
        <li>
          Las costuras planas y el cuello sin etiqueta reducen el roce y aumentan la comodidad.
        </li>
        <li>
          TBMPOY Camiseta polo perfecta para senderismo, golf, correr, pesca, vela, natación, campamento y cualquier otro deporte favorito de las mujeres y uso diario.
        </li>
      </ul>
    </div>

    {/* Columna Derecha */}
    <div>
      <h3 className="font-semibold text-gray-800 mb-2">Instrucciones de lavado:</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Totalmente lavable a máquina para un fácil cuidado.</li>
        <li>Lavar antes de usar, lavar con colores similares.</li>
        <li>
          Lavar con agua fría; No usar blanqueador; No escurrir ni torcer; Secar en la sombra.
        </li>
      </ul>
    </div>
  </div>
</div>


        )}

        {tabActivo === "especificaciones" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2 w-1/2">
                      Condición de producto
                    </td>
                    <td className="px-4 py-2">Nuevo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Marca</td>
                    <td className="px-4 py-2">GAP</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Modelo</td>
                    <td className="px-4 py-2">GHY-K89</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Material</td>
                    <td className="px-4 py-2">Textil</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">País de origen</td>
                    <td className="px-4 py-2">China</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Composición</td>
                    <td className="px-4 py-2">100% poliéster</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Diseño</td>
                    <td className="px-4 py-2">Liso</td>
                  </tr>
                  <tr>
                    <td className="bg-indigo-50 font-medium px-4 py-2">Tipo de cuello</td>
                    <td className="px-4 py-2">Clásico</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Columna derecha */}
            <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2 w-1/2">Fit</td>
                    <td className="px-4 py-2">Regular fit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Tipo</td>
                    <td className="px-4 py-2">Abrigos</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Largo de mangas</td>
                    <td className="px-4 py-2">Manga larga</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Tipo de cierre</td>
                    <td className="px-4 py-2">No tiene</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Género</td>
                    <td className="px-4 py-2">Mujer</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-indigo-50 font-medium px-4 py-2">Estilo de vestuario</td>
                    <td className="px-4 py-2">Casual</td>
                  </tr>
                  <tr>
                    <td className="bg-indigo-50 font-medium px-4 py-2">Temporada</td>
                    <td className="px-4 py-2">Otoño</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="mt-12">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Opiniones de clientes:
  </h2>

  {/* Filtros */}
  <div className="flex items-center gap-3 mb-6">
    <div className="relative">
      <select className="appearance-none px-4 py-2 pr-8 border rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium cursor-pointer">
        <option>Filtro: Todas las opiniones</option>
        <option>5 estrellas</option>
        <option>4 estrellas</option>
        <option>3 estrellas</option>
        <option>2 estrellas</option>
        <option>1 estrella</option>
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        ▼
      </span>
    </div>

    <button className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition">
      Con foto/video
    </button>
  </div>

  {/* Placeholder de opiniones */}
  <div className="text-gray-500 text-sm">
    No hay opiniones aún. ¡Sé el primero en dejar una reseña!
  </div>
</div>
      </div>



       <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Productos similares:
            </h2>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
  {productosSimilares.map((prod) => (
    <div
      key={prod.id}
      className="min-w-[200px] bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 relative"
    >
      {/* Etiqueta descuento */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
        -50%
      </span>

      {/* Corazón */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
        ♥
      </button>

      {/* Imagen */}
      <div
        className="bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer"
        onClick={() => navigate(`/producto/${prod.id}`)}
      >
        <img
          src={prod.image}
          alt={prod.nombre}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-2">
        {/* Nombre + Rating */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {prod.nombre}
          </h3>
          <div className="flex items-center text-xs text-red-500 gap-1">
            <span>★ 4.9</span>
          </div>
        </div>

        <p className="text-xs text-gray-500">Wooden Sofa Chair</p>

        {/* Precio */}
        <div className="flex items-center gap-2">
          <p className="text-red-600 font-bold text-base">S/ {prod.precio}</p>
          <p className="text-gray-400 text-sm line-through">S/ 160.00</p>
        </div>
      </div>

      {/* Botón */}
      <button
        className="flex items-center justify-center bg-[#DFE162] text-[#484900] py-2 px-4 mt-3 rounded-xl hover:bg-[#d4d94e] transition text-sm font-medium"
        onClick={() => agregarAlCarrito(prod)}
      >
        🛒 Agregar al carrito
      </button>
    </div>
  ))}
</div>

          </div>


           <div className="mt-12">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    mas opciones :
  </h2>

  <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
    {productosSimilares.map((prod) => (
      <div
        key={prod.id}
        className="min-w-[200px] bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 relative"
      >
        {/* Etiqueta descuento */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
          -50%
        </span>

        {/* Corazón */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          ♥
        </button>

        {/* Imagen */}
        <div
          className="bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer"
          onClick={() => navigate(`/producto/${prod.id}`)}
        >
          <img
            src={prod.image}
            alt={prod.nombre}
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Info */}
        <div className="mt-3 flex flex-col gap-2">
          {/* Nombre + Rating */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
              {prod.nombre}
            </h3>
            <div className="flex items-center text-xs text-red-500 gap-1">
              <span>★ 4.9</span>
            </div>
          </div>

          <p className="text-xs text-gray-500">Wooden Sofa Chair</p>

          {/* Precio */}
          <div className="flex items-center gap-2">
            <p className="text-red-600 font-bold text-base">S/ {prod.precio}</p>
            <p className="text-gray-400 text-sm line-through">S/ 160.00</p>
          </div>
        </div>

        {/* Botón */}
        <button
          className="flex items-center justify-center bg-[#DFE162] text-[#484900] py-2 px-4 mt-3 rounded-xl hover:bg-[#d4d94e] transition text-sm font-medium"
          onClick={() => agregarAlCarrito(prod)}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    ))}
  </div>
</div>

      
    </div>
    
    
  );
};

export default DetailsProduct;
