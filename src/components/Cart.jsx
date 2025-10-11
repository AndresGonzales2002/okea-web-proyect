import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import visa from "../assets/iconos/VISAIcono.svg";
import mastercard from "../assets/iconos/MCIcon.svg";
import logo_okea from "../assets/iconos/okea_logo.svg"
import { FaCreditCard, FaCalendarAlt, FaUser, FaLock, FaWallet } from "react-icons/fa";
import { Tag24Regular } from "@fluentui/react-icons";
import { Delete24Regular } from "@fluentui/react-icons";
import { Person24Regular } from "@fluentui/react-icons";




const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const [paso, setPaso] = useState(1); // 1 = productos, 2 = formulario, 3 = métodos de pago

  const costoDeEnvio = 10;
  const subTotal = carrito.reduce((acc, producto) =>
    acc + producto.precio * producto.cantidad
  , 0);
  const total = subTotal + costoDeEnvio;

  const handleAumentarCantidad = (id) => actualizarCantidad(id, 1);
  const handleDisminuirCantidad = (id) => {
    const producto = carrito.find((item) => item.id === id);
    if (producto.cantidad > 1) actualizarCantidad(id, -1);
  };

const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-yellow-100 p-6">
      <div className="max-w-7xl mt-40 mx-auto rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4">
        
        
        {/* Sidebar */}
<aside className="bg-gray-100/60 p-6 md:col-span-1 flex flex-col items-start rounded-l-2xl">
  <img src={logo_okea} alt="" className="w-32 mb-6" />


  {/* Botones un poco más abajo */}
  <div className="flex flex-col gap-2 mt-4 w-full">
   <button
  className={`w-60 h-10 flex justify-between items-center px-4 py-2 rounded-2xl 
    ${paso >= 1 ? "bg-[#1C4390] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
>
  <span className="text-xs">🛒 Carrito de compras</span>
  <span className="text-xs">&gt;</span>
</button>

<button
  className={`w-60 h-10 flex justify-between items-center px-4 py-2 rounded-2xl 
    ${paso >= 2 ? "bg-[#1C4390] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
>
  <span className="text-xs">📦 Datos y entrega</span>
  <span className="text-xs">&gt;</span>
</button>

<button
  className={`w-60 h-10 flex justify-between items-center px-4 py-2 rounded-2xl 
    ${paso >= 3 ? "bg-[#1C4390] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
>
  <span className="text-xs">💳 Métodos de pago</span>
  <span className="text-xs">&gt;</span>
</button>


  </div>

  {/* User info al fondo */}
  <div className="mt-auto w-full flex items-center gap-3 pt-6">
  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
    <Person24Regular className="text-gray-500 w-6 h-6" />
  </div>
  <span className="text-gray-600 text-sm">User Name</span>
</div>
</aside>




        {/* Contenido central */}
        <main className="bg-gray-100/60 p-6 md:col-span-2">
         {paso === 1 && (
  <>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Carrito</h1>

    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl text-gray-800">Productos pedidos</h2>
      <button className="px-4 py-2 rounded-full bg-[#E6EA52] text-gray-800 hover:bg-yellow-400 transition text-xs">
        + Seguir Comprando
      </button>
    </div>

    <ul className="divide-y divide-gray-300 max-h-[500px] overflow-y-auto ocultar-scroll">
      {carrito.map((producto) => (
        <li
          key={producto.id}
          className="flex items-center justify-between py-4"
        >
                <div className="flex items-center gap-4">
        <img
          src={producto.imagen || "https://via.placeholder.com/150"}
          alt={producto.nombre}
          className="w-38 h-30 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-start">
        <p className="font-medium text-gray-800 mb-6">{producto.nombre}</p> 
        <p className="text-xs text-gray-500 mb-1">{producto.descripcion}</p>
        
        {/* Stock + calificación */}
        <p className="text-xs text-gray-500 flex items-center gap-1">
          Stock disponible 
          
        </p>

        {/* Estrella decorativa */}
        <div className="flex items-center gap-1">
        <span className="text-red-500 font-medium text-sm">★</span>
        <span className="text-xs text-gray-700">4.9</span>
      </div>

      </div>

      </div>


          <div className="flex flex-col items-end gap-3">
            <p className="text-blue-800 font-medium">
              S/ {producto.precio.toFixed(2)}
            </p>

            <button
  onClick={() => eliminarProducto(producto.id)}
  className=""
>
  <Delete24Regular className="w-5 h-5" />
</button>


            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDisminuirCantidad(producto.id)}
                className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-xs"
              >
                –
              </button>
              <span className="w-7 h-7 flex items-center justify-center border border-black rounded-md text-xs">
                {producto.cantidad}
              </span>
              <button
                onClick={() => handleAumentarCantidad(producto.id)}
                className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-xs"
              >
                +
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </>
)}


         {paso === 2 && (
  <>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Datos del cliente y envío</h1>

    {/* Contenedor con scroll */}
    <div className="max-h-[600px] overflow-y-auto space-y-6 ocultar-scroll">
      
      {/* Bloque Datos del cliente */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Datos de cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nombre*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
          <input type="text" placeholder="Apellido*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
          <input type="email" placeholder="Correo electrónico*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
          <input type="tel" placeholder="Celular*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
          <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
            <option>Tipo de documento*</option>
            <option>DNI</option>
            <option>Pasaporte</option>
            <option>Carnet de extranjería</option>
          </select>
          <input type="text" placeholder="Número de documento*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
        </div>
      </div>

      {/* Bloque Dirección */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Completa tu dirección de entrega</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
            <option>Departamento*</option>
          </select>
          <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
            <option>Provincia*</option>
          </select>
          <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
            <option>Distrito*</option>
          </select>
          <input type="text" placeholder="Dirección*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
          <input type="text" placeholder="Número*" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
          <input type="text" placeholder="Referencia (opcional)" className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600" />
        </div>
      </div>

      {/* Bloque Reserva de horario */}
      <div className="bg-white p-6 rounded-xl shadow-sm relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reserva un horario para la entrega</h2>
       <div className="space-y-8 pl-4">
  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-2 text-gray-700">
      <input
        type="radio"
        name="horario"
        className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-300"
      />
      <span>Domingo, 3 ago. 2025</span>
    </div>
    <span className="text-gray-600">S/ 34.00</span>
  </label>

  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-2 text-gray-700">
      <input
        type="radio"
        name="horario"
        className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-300"
      />
      <span>Lunes, 4 ago. 2025</span>
    </div>
    <span className="text-gray-600">S/ 34.00</span>
  </label>

  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-2 text-gray-700">
      <input
        type="radio"
        name="horario"
        className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-300"
      />
      <span>Martes, 5 ago. 2025</span>
    </div>
    <span className="text-gray-600">S/ 34.00</span>
  </label>
</div>



        {/* Input calendario */}
        <div className="mt-6 w-full">
          <input
            type="date"
            placeholder="Ver más fechas"
            className="w-full px-4 py-3 border rounded-lg text-gray-600 cursor-pointer [color-scheme:light]"
            onChange={(e) => {
              const fecha = new Date(e.target.value);
              const opciones = { day: "numeric", month: "long", year: "numeric" };
              setFechaSeleccionada(fecha.toLocaleDateString("es-ES", opciones));
            }}
          />
        </div>
      </div>
    </div>
  </>
)}






          {paso === 3 && (
  <>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Método de pago</h1>

    <div className="p-3 rounded-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Productos pedidos</h2>
        <button className="px-3 py-1 text-sm border rounded-full text-gray-600 hover:bg-gray-100">
          ✏️ Editar pedido
        </button>
      </div>

      {/* Contenedor del scroll horizontal */}
      <div className="relative">
        {/* Flecha izquierda */}
        <button
          onClick={() =>
            document
              .getElementById("productosScroll")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 text-[#1C4390] text-2xl"
        >
          ‹
        </button>

        {/* Contenedor con scroll horizontal */}
        <div
          id="productosScroll"
          className="flex gap-4 overflow-x-auto scroll-smooth px-8 scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {carrito.map((producto) => (
            <div
              key={producto.id}
              className="min-w-[120px] rounded-lg overflow-hidden shadow-sm bg-white flex flex-col scroll-snap-align-start"
            >
              {/* Imagen con fondo gris */}
              <div className="bg-gray-200 flex items-center justify-center h-28">
                <img
                  src={producto.imagen || "https://via.placeholder.com/100"}
                  alt={producto.nombre}
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Info del producto */}
              <div className="flex-1 bg-white text-left p-2 h-24">
                <p className="text-[11px] font-medium text-gray-800 truncate">
                  {producto.nombre}
                </p>
                <p className="text-[10px] text-gray-500">
                  {producto.cantidad} unidades
                </p>
                <p className="text-[11px] font-semibold text-blue-600">
                  S/ {(producto.precio * producto.cantidad).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={() =>
            document
              .getElementById("productosScroll")
              .scrollBy({ left: 300, behavior: "smooth" })
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#1C4390] text-2xl"
        >
          ›
        </button>
      </div>
    </div>

    {/* Métodos de pago */}
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Tarjeta de Crédito / Débito
        </h2>

        {/* Logos de tarjetas */}
        <div className="flex gap-2">
          <img src={mastercard} alt="Mastercard" className="h-8" />
          <img src={visa} alt="Visa" className="h-5" />
          <img src="/amex.png" alt="Amex" className="h-5" />
        </div>
      </div>

      {/* Inputs en grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

  {/* Fila 1 */}
  <div className="relative md:col-span-2">
    <FaCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="Número de tarjeta"
      className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
    />
  </div>

  <div className="relative">
    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="MM/AA"
      className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
    />
  </div>

  {/* Fila 2 */}
  <div className="relative md:col-span-2">
    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="Nombre del titular de la tarjeta"
      className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
    />
  </div>

  <div className="relative">
    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="CVV"
      className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
    />
  </div>

  {/* Fila 3 */}
  <div className="relative md:col-span-3">
    <FaWallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <select className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700">
      <option>¿En cuántas cuotas deseas pagar?</option>
      <option>1 cuota</option>
      <option>3 cuotas</option>
      <option>6 cuotas</option>
      <option>12 cuotas</option>
    </select>
  </div>
</div>



      {/* Tipos de pago adicionales */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 mb-2">Tipos de pago admitidos:</p>

        <div className="flex items-center justify-between w-full">
  {/* Grupo izquierdo */}
  <div className="flex items-center gap-4">
    <img src={mastercard} alt="Mastercard" className="h-8" />
    <img src={visa} alt="Visa" className="h-5" />
  </div>

  {/* Grupo derecho */}
  <div className="flex items-center gap-4">
    <img src="/mercadopago.png" alt="Mercado Pago" className="h-8" />
    <img src="/yape.png" alt="Yape" className="h-8" />
  </div>
</div>


        <p className="text-xs text-gray-400 mt-2">
          Aplican términos y condiciones
        </p>
      </div>
    </div>
  </>
)}

        </main>

        {/* Resumen - NO SE TOCA */}
        <aside className="bg-white border border-white rounded-r-3xl p-6 shadow-sm md:col-span-1 flex flex-col">
  <div>
    <h2 className="text-xl font-bold text-gray-800 mb-6">Detalles del pedido</h2> {/* antes mb-4 */}
    <p className="text-sm text-gray-500 mb-6"> {/* antes mb-4 */}
      Tienes {carrito.length} productos en tu carrito
    </p>
    
    <hr className="border-t border-gray-300 my-6" />
    <p className="text-lg font-semibold text-gray-800 mt-4 mb-6">Cupones</p>

    <div className="flex items-center mb- gap-x-3"> {/* antes mb-4 */}
  <div className="relative w-45">
  <Tag24Regular className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
  <input
    type="text"
    placeholder="Cód. de cupón"
    className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-none text-xs"
  />
</div>

  
  <button className="px-4 py-3 bg-[#E6EA52] text-gray-800 rounded-2xl hover:bg-yellow-400 transition text-xs">
    Aplicar
  </button>
</div>

    <hr className="border-t border-gray-300 my-6" />
    <div className=" pt-2 space-y-4 text-gray-700"> {/* antes pt-4 y space-y-2 */}
  <p className='text-lg font-semibold text-gray-800'>resumen de la orden</p>
  
  <p className="flex justify-between text-sm">
    <span>Subtotal</span> <span>S/ {subTotal.toFixed(2)}</span>
  </p>
  
  <p className="flex justify-between text-sm">
    <span>ahorro total</span> <span>S/ {costoDeEnvio.toFixed(2)}</span>
  </p>
  
  <p className="flex justify-between text-sm">
    <span>Envío</span> <span>S/ {costoDeEnvio.toFixed(2)}</span>
  </p>
  
  <hr className="border-t border-gray-300 my-2" />
  
  <p className="flex justify-between font-semibold text-lg"> {/* antes pt-3 */}
    <span>Total</span> <span>S/ {total.toFixed(2)}</span>
  </p>
</div>

  </div>
  <div className="mt-auto">
    <label className="flex items-center gap-2 text-sm text-gray-600 mb-6 cursor-pointer"> {/* antes mb-4 */}
      <input
        type="radio"
        className="h-4 w-4 text-yellow-400 border-gray-400 focus:ring-yellow-300"
      />
      términos y condiciones
    </label>
    <button
      onClick={() => setPaso((prev) => (prev === 3 ? 1 : prev + 1))}
      className="w-full py-3 bg-[#E6EA52] text-gray-900 rounded-full font-medium text-xs hover:bg-yellow-400 transition" 
      /* antes py-2 */
    >
      Continuar con los métodos de pago
    </button>
  </div>
</aside>

      </div>
    </div>
  );
};

export default Cart;
