import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaHome,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [casas, setCasas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [descModalVisible, setDescModalVisible] = useState(false);
  const [selectedCasa, setSelectedCasa] = useState(null);
  const [fullDescription, setFullDescription] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/casas")
      .then((res) => res.json())
      .then((data) => {
        setCasas(data.casas);
      })
      .catch((err) => console.error("Error al cargar casas:", err));
  }, []);

  const handleOpenModal = (casa) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sing-in");
    } else {
      setSelectedCasa(casa);
      setModalVisible(true);
    }
  };

  const handleOpenDescModal = (descripcion) => {
    setFullDescription(descripcion);
    setDescModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTitulo("");
    setMensaje("");
  };

  const handleCloseDescModal = () => {
    setDescModalVisible(false);
    setFullDescription("");
  };

  const handleEnviar = () => {
    alert("Mensaje enviado");
    handleCloseModal();
  };

  // Función para truncar texto muy largo
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "Descripción no disponible";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-screen">
      {/* Título principal */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Catálogo de Propiedades
        </h1>
        <p className="text-lg text-slate-600">
          Explora nuestras viviendas disponibles
        </p>
      </div>

      {/* Listado de propiedades */}
      {casas.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <p className="text-slate-500 text-lg">
            No hay propiedades disponibles en este momento.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {casas.map((casa, index) => (
            <motion.div
              key={casa._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white">
                <FaHome className="text-5xl opacity-30" />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {casa.nombre || "Propiedad sin nombre"}
                </h3>

                <p className="text-slate-600 mb-3 flex items-center text-sm">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  {casa.ubicacion}
                </p>

                <p className="text-2xl font-bold text-slate-800 mb-4">
                  ${casa.precio ? casa.precio.toLocaleString() : "0"}
                </p>

                <div className="mb-4 flex-grow">
                  <p className="text-slate-500 text-sm mb-2">
                    {truncateText(casa.descripcion)}
                  </p>
                  {casa.descripcion && casa.descripcion.length > 120 && (
                    <button
                      onClick={() => handleOpenDescModal(casa.descripcion)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <FaInfoCircle className="mr-1" /> Ver descripción completa
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleOpenModal(casa)}
                  className="w-full bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center mt-auto"
                >
                  <FaEnvelope className="mr-2" /> Contactar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de descripción completa */}
      {descModalVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] flex flex-col"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-slate-600" />
              Descripción completa
            </h2>

            <div className="flex-grow overflow-y-auto mb-6">
              <p className="text-slate-600 whitespace-pre-line">
                {fullDescription || "Descripción no disponible"}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCloseDescModal}
                className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal de contacto */}
      {modalVisible && selectedCasa && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <FaEnvelope className="mr-2 text-slate-600" />
              Contactar sobre: {selectedCasa.nombre || "la propiedad"}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Asunto
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Ej: Consulta sobre la propiedad"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mensaje
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={4}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleEnviar}
                className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center"
              >
                <FaEnvelope className="mr-2" /> Enviar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
