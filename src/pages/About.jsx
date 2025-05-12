import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaHome,
  FaRulerCombined,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";
import { MdArchitecture, MdEngineering } from "react-icons/md";

const About = () => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          className="bg-white rounded-xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow duration-300"
        >
          {/* Encabezado */}
          <motion.div variants={itemAnimation} className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-slate-200 p-4 rounded-full mb-6">
              <FaBuilding className="text-4xl text-slate-700" />
              <span className="ml-2 text-2xl font-bold text-slate-500">
                Proyecta
              </span>
              <span className="text-2xl font-bold text-slate-700">Bim360</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-slate-800">
              Sobre Nosotros
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Especialistas en soluciones BIM para proyectos inmobiliarios y
              construcción
            </p>
          </motion.div>

          {/* Contenido principal */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Columna izquierda */}
            <motion.div variants={itemAnimation} className="space-y-8">
              <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-slate-500">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-800">
                  <MdArchitecture className="mr-3 text-slate-600" />
                  Nuestra Especialidad
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  En ProyectaBim360 combinamos tecnología BIM con modelado 3D
                  avanzado para ofrecer catálogos de viviendas interactivos que
                  permiten visualizar proyectos antes de su construcción.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-800">
                  <FaUsers className="mr-3 text-slate-600" />
                  Nuestro Equipo
                </h2>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center">
                    <MdEngineering className="text-slate-700 mr-3" />
                    <span>Arquitectos e ingenieros especializados en BIM</span>
                  </li>
                  <li className="flex items-center">
                    <FaRulerCombined className="text-slate-700 mr-3" />
                    <span>
                      Modeladores 3D con experiencia en proyectos inmobiliarios
                    </span>
                  </li>
                  <li className="flex items-center">
                    <FaHome className="text-slate-700 mr-3" />
                    <span>
                      Consultores en desarrollo de catálogos digitales
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Columna derecha */}
            <motion.div variants={itemAnimation} className="space-y-8">
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-8 rounded-lg text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  Nuestra Metodología
                </h3>
                <p className="mb-6">
                  Utilizamos flujos de trabajo BIM colaborativos para crear
                  modelos precisos que sirven como base para tus catálogos de
                  viviendas, permitiendo:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="bg-slate-200 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                      1
                    </span>
                    <span>Visualización realista de proyectos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-200 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                      2
                    </span>
                    <span>Generación automática de documentación técnica</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-200 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                      3
                    </span>
                    <span>
                      Integración con plataformas de gestión de proyectos
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-slate-800">
                  <FaHandshake className="mr-3 text-slate-600" />
                  Nuestros Valores
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="font-bold text-slate-700 mb-2">
                      Precisión
                    </div>
                    <div className="text-sm text-slate-600">
                      Modelos BIM exactos y detallados
                    </div>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="font-bold text-slate-700 mb-2">
                      Innovación
                    </div>
                    <div className="text-sm text-slate-600">
                      Soluciones tecnológicas avanzadas
                    </div>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="font-bold text-slate-700 mb-2">
                      Colaboración
                    </div>
                    <div className="text-sm text-slate-600">
                      Trabajo en equipo con nuestros clientes
                    </div>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="font-bold text-slate-700 mb-2">Calidad</div>
                    <div className="text-sm text-slate-600">
                      Estándares BIM internacionales
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
