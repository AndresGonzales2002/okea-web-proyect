import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ⬇️ OJO: si este archivo está en components/Navbar/, la ruta al contexto es ../CartContext
import { useCart } from '../CartContext';
import { Link } from "react-router-dom";



function StarIcon({ color = '#DFE162' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
  );
}

export default function CartBadgeDropdown() {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 👇 Traemos todo del contexto
  const { carrito = [], subtotal = 0, cambiarCantidad = () => {}, eliminarDelCarrito = () => {} } = useCart();

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`shadow-lg border flex flex-col relative ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      style={{
        backgroundColor: 'rgba(44, 80, 158, 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        width: '352px',
        height: '558px',
        borderRadius: '32px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        padding: '16px',
        gap: '20px',
        transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
        top: '17px',
        right: '0px',
        overflowY: 'auto',
      }}
    >
      {/* Subtotal + botón */}
      <div
        className="flex items-center justify-between rounded-2xl px-4 py-3 mb-2 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(44, 80, 158, 0.1)', borderRadius: 20, minHeight: 60 }}
      >
        <div className="flex flex-col">
          <span className="text-white font-poppins text-[15px] font-light">Subtotal</span>
          <span className="text-[#DFE162] font-poppins text-[22px] font-light leading-6">s/ {Number(subtotal).toFixed(2)}</span>
        </div>
        <button
  type="button"
  className="ml-2 px-0 py-0 rounded-full font-poppins text-[15px] font-medium bg-[#DFE162] text-[#484900] hover:bg-[#e4e666] transition"
  style={{ minWidth: 120 }}
  onClick={() => {
    // si usas la regla de "solo mostrar Cart si vienes desde este botón"
    sessionStorage.setItem("allowCartView", "1");
  }}
>
  <Link
    to="/carrito"
    className="block w-full h-full px-6 py-2 rounded-full text-center"
    aria-label="Abrir carrito"
  >
    Ir al carrito
  </Link>
</button>

      </div>

      {/* Lista de productos del contexto */}
      <div className="flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: 420 }}>
        {carrito.length === 0 && (
          <div className="text-white/90 text-sm text-center py-6">Tu carrito está vacío</div>
        )}

        {carrito.map((item, i) => {
          const nombre = item.nombre ?? item.name ?? 'Producto';
          const precio = Number(item.precio ?? item.price ?? 0);
          const cantidad = Math.max(1, Number(item.cantidad ?? item.quantity ?? 1));
          const totalLinea = precio * cantidad;
          const img = item.imagen ?? item.image ?? 'https://via.placeholder.com/80';

          return (
            <div
              key={item.id ?? i}
              className="flex flex-row items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(59, 91, 170, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                minHeight: 110,
                borderRadius: 20,
              }}
            >
              {/* Info izquierda */}
              <div className="flex flex-col flex-1 min-w-0" style={{ maxWidth: 160 }}>
                <span className="text-white font-poppins text-[15px] font-light truncate" title={nombre}>
                  {nombre}
                </span>
                <span className="text-[#FFFFFF] font-poppins text-[17px] font-light leading-6">
                  s/ {totalLinea.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon />
                  <span className="text-[#FFFFFF] text-[14px] font-light ml-1">4.9</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded-full text-white text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent"
                    style={{ backdropFilter: 'blur(6px)', fontSize: 18 }}
                    onClick={() => cambiarCantidad(item.id, -1)}
                  >
                    –
                  </button>

                  <input
                    type="text"
                    value={cantidad}
                    readOnly
                    className="w-8 h-7 text-center rounded text-[#FFFFFF] font-light font-poppins text-[15px] mx-1 outline-none border border-white bg-transparent"
                    style={{ minWidth: 32 }}
                  />

                  <button
                    className="w-7 h-7 flex items-center justify-center rounded-full text-white text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent"
                    style={{ backdropFilter: 'blur(6px)', fontSize: 18 }}
                    onClick={() => cambiarCantidad(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="mt-2 text-xs text-white/80 hover:text-[#DFE162] underline"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Quitar
                </button>
              </div>

              {/* Imagen */}
              <div className="flex-shrink-0 flex items-center justify-center ml-4" style={{ height: 90, width: 90, background: '#fff', borderRadius: 16 }}>
                <img
                  src={img}
                  alt={nombre}
                  className="object-contain"
                  style={{ maxHeight: 80, maxWidth: 80, borderRadius: 12 }}
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80'; }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
