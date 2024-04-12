import React from 'react';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const WelcomeScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <FaShieldAlt className="text-white text-5xl absolute top-0 left-0 mt-8 ml-8" />
            <FaLock className="text-white text-5xl absolute top-0 right-0 mt-8 mr-8" />
            <h1 className="text-4xl font-bold text-white mb-4">Bienvenido Supervisor</h1>
            <p className="text-lg text-white mb-8">El supervisor puede revisar y aprobar solicitudes, asignar tareas a los miembros del equipo, y generar informes de progreso.</p>
        </div>
    );
};

export default WelcomeScreen;
