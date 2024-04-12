import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const WelcomeScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <FaShieldAlt className="text-white text-5xl absolute top-0 left-0 mt-8 ml-8" />
            <FaLock className="text-white text-5xl absolute top-0 right-0 mt-8 mr-8" />
            <h1 className="text-4xl font-bold text-white mb-4">Bienvenido a SecureLogin</h1>
            <p className="text-lg text-white mb-8">Una aplicación web segura para autenticación y protección contra XSS</p>
            <div className="flex">
                <Link to="/register" className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Registro</Link>
                <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Iniciar sesión</Link>
            </div>
        </div>
    );
};

export default WelcomeScreen;
