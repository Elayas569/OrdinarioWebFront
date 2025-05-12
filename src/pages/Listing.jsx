import { useEffect, useState } from "react";
import {
  FaHome,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaDollarSign,
  FaMapMarkerAlt,
  FaAlignLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;
const BASE_URL = `${API}/casas`;
const MIS_CASAS_URL = `${API}/casas/mis-casas`;

const Listing = () => {
  const [casas, setCasas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    ubicacion: "",
    descripcion: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCasas = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado.");
      return;
    }

    try {
      const res = await fetch(MIS_CASAS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener las casas");

      const data = await res.json();
      setCasas(data.casas || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCasas();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No estás autenticado.");
      return;
    }

    try {
      const url = editId ? `${BASE_URL}/${editId}` : BASE_URL;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al procesar la solicitud");
      }

      setFormData({ nombre: "", precio: "", ubicacion: "", descripcion: "" });
      setEditId(null);
      await fetchCasas();
      setError(null);
      setSuccess(
        editId
          ? "Casa actualizada correctamente"
          : "Casa agregada correctamente"
      );

      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No estás autenticado.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que quieres eliminar esta casa?")) {
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar la casa");

      await fetchCasas();
      setError(null);
      setSuccess("Casa eliminada correctamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const handleEdit = (casa) => {
    setFormData({
      nombre: casa.nombre,
      precio: casa.precio,
      ubicacion: casa.ubicacion,
      descripcion: casa.descripcion,
    });
    setEditId(casa._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center text-slate-800"
      >
        <FaHome className="inline mr-3 text-blue-600" />
        Gestión de Propiedades
      </motion.h1>

      {/* Mensajes de estado */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
        >
          <p>{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded"
        >
          <p>{success}</p>
        </motion.div>
      )}

      {/* Formulario */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10 bg-white p-6 rounded-xl shadow-md border border-slate-200"
      >
        <h2 className="text-xl font-semibold mb-6 text-slate-700">
          {editId ? (
            <>
              <FaEdit className="inline mr-2 text-yellow-500" />
              Editar Propiedad
            </>
          ) : (
            <>
              <FaPlus className="inline mr-2 text-blue-500" />
              Agregar Nueva Propiedad
            </>
          )}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre de la propiedad"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  required
                />
                <FaHome className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Precio
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="precio"
                  placeholder="Precio en USD"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  required
                  min="0"
                />
                <FaDollarSign className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Ubicación
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="ubicacion"
                  placeholder="Dirección o sector"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  required
                />
                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción
              </label>
              <div className="relative">
                <textarea
                  name="descripcion"
                  placeholder="Detalles de la propiedad"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 h-32"
                  required
                />
                <FaAlignLeft className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({
                  nombre: "",
                  precio: "",
                  ubicacion: "",
                  descripcion: "",
                });
              }}
              className="flex items-center px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
            >
              <FaTimes className="mr-2" /> Cancelar
            </button>
          )}
          <button
            type="submit"
            className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {editId ? (
              <>
                <FaEdit className="mr-2" /> Actualizar
              </>
            ) : (
              <>
                <FaPlus className="mr-2" /> Agregar
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* Lista de propiedades */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center">
          <FaHome className="mr-3 text-blue-600" />
          Mis Propiedades ({casas.length})
        </h2>

        {casas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center"
          >
            <p className="text-slate-500 text-lg">
              No tienes propiedades registradas aún.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {casas.map((casa) => (
              <motion.div
                key={casa._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring" }}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-slate-200 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {casa.nombre}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    ${casa.precio.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center text-slate-600 mb-3">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span>{casa.ubicacion}</span>
                </div>

                <p className="text-slate-600 mb-4 line-clamp-3">
                  {casa.descripcion}
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(casa)}
                    className="flex-1 flex items-center justify-center py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition"
                  >
                    <FaEdit className="mr-2" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(casa._id)}
                    className="flex-1 flex items-center justify-center py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    <FaTrash className="mr-2" /> Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
