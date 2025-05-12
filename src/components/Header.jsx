import React from "react";
import {
  FaHome,
  FaInfoCircle,
  FaEdit,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sing-in");
  };

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg w-full sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-white p-2 rounded-lg">
              <FaHome className="text-2xl text-slate-700" />
            </div>
            <h1 className="font-bold text-xl sm:text-2xl text-white">
              <span className="text-slate-300">Proyecta</span>
              <span className="text-white">Bim360</span>
            </h1>
          </motion.div>
        </Link>

        {/* Menú de navegación */}
        <nav>
          <ul className="flex items-center space-x-4 sm:space-x-6">
            <motion.li whileHover={{ y: -2 }}>
              <Link
                to="/"
                className="hidden sm:flex items-center text-slate-200 hover:text-white transition-colors"
              >
                <FaHome className="mr-2" />
                <span>Inicio</span>
              </Link>
            </motion.li>

            <motion.li whileHover={{ y: -2 }}>
              <Link
                to="/about"
                className="hidden sm:flex items-center text-slate-200 hover:text-white transition-colors"
              >
                <FaInfoCircle className="mr-2" />
                <span>Nosotros</span>
              </Link>
            </motion.li>

            {isLoggedIn ? (
              <>
                <motion.li whileHover={{ y: -2 }}>
                  <Link
                    to="/edit-listing"
                    className="flex items-center bg-white text-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                  >
                    <FaEdit className="mr-2" />
                    <span className="hidden sm:inline">Mis Propiedades</span>
                    <span className="sm:hidden">Mis Prop.</span>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm group"
                  >
                    <FaSignOutAlt className="mr-2 group-hover:rotate-180 transition-transform" />
                    <span className="hidden sm:inline">Cerrar sesión</span>
                    <span className="sm:hidden">Salir</span>
                  </button>
                </motion.li>
              </>
            ) : (
              <motion.li whileHover={{ y: -2 }}>
                <Link
                  to="/sing-in"
                  className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors shadow-sm"
                >
                  <FaSignInAlt className="mr-2" />
                  <span>Ingresar</span>
                </Link>
              </motion.li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
