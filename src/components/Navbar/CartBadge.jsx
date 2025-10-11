import { Link } from "react-router-dom";  // Asegúrate de importar Link
import { CartIcon } from "../../assets/iconos/Icons";

export default function CartBadge({ count = 0 }) {
  return (
    <div className="translate-x-[-120px]">
      {/* Envolvemos el botón con Link para navegar al carrito */}
      <Link to="" className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#1C4390] hover:brightness-95 transition cursor-pointer">
        <CartIcon className="w-[20px] h-[20px] text-white" />

        {/* Si el contador es mayor a 0, mostramos el número */}
        {count > 0 && (
          <span className="absolute -top-[6px] -right-[6px] min-w-[18px] h-[18px] px-[4px] rounded-full bg-[#DFE162] text-gray-800 text-[12px] font-bold flex items-center justify-center leading-none">
            {count}
          </span>
        )}
      </Link>
    </div>
  );
}