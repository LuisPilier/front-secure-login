import React, { useState } from 'react';
import axios from 'axios';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('supervisor');
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si los campos están vacíos
        if (!username || !password) {
            setAlert({
                type: 'error',
                message: 'Por favor, complete todos los campos.'
            });
            return;
        }

        // Validar la longitud de los campos
        if (username.length < 6 || password.length < 6) {
            setAlert({
                type: 'error',
                message: 'Nombre de usuario y contraseña deben tener al menos 6 caracteres.'
            });
            return;
        }

        // Validar si contiene espacios
        if (/\s/.test(username) || /\s/.test(password)) {
            setAlert({
                type: 'error',
                message: 'El nombre de usuario y la contraseña no pueden contener espacios.'
            });
            return;
        }

        // Validar inyección SQL
        const sqlInjectionPattern = /(\b(SELECT|UPDATE|INSERT|DELETE|DROP|UNION|AND|OR|LIKE|CREATE|ALTER|JOIN|HAVING)\b)/i;
        if (sqlInjectionPattern.test(username) || sqlInjectionPattern.test(password)) {
            setAlert({
                type: 'error',
                message: 'Nombre de usuario y contraseña no pueden contener palabras reservadas de SQL.'
            });
            return;
        }

        try {
            // Enviar la solicitud de registro al servidor
            const response = await axios.post('http://localhost:3001/register', { username, password, role });
            setAlert({
                type: 'success',
                message: response.data.message
            });
        } catch (error) {
            // Manejar errores de la solicitud
            setAlert({
                type: 'error',
                message: error.response.data.error
            });
        }

        setTimeout(() => {
            setAlert(null);
        }, 4000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <FaShieldAlt className="text-white text-5xl absolute top-0 left-0 mt-8 ml-8" />
            <FaLock className="text-white text-5xl absolute top-0 right-0 mt-8 mr-8" />
            <h1 className="text-4xl font-bold text-white mb-4">Registro</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre de usuario" />
                </div>
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Contraseña:</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Contraseña" />
                </div>
                <label className="block text-white text-sm font-bold mb-2">Rol:</label>
                <div className="flex flex-wrap mb-6">
                    <div className="flex items-center mr-4">
                        <input type="radio" id="supervisor" name="role" value="supervisor" checked={role === 'supervisor'} onChange={() => setRole('supervisor')} className="form-radio text-primary h-4 w-4" />
                        <label htmlFor="supervisor" className="ml-2 text-white">Supervisor</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" id="admin" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} className="form-radio text-primary h-4 w-4" />
                        <label htmlFor="admin" className="ml-2 text-white">Administrador</label>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Registrarse
                    </button>
                </div>
            </form>
            {alert && (
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute bottom-0 mb-4" role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">{alert.type === 'error' ? 'Error:' : 'Éxito:'}</p>
                            <p className="text-sm">{alert.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
