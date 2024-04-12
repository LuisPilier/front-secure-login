import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si el nombre de usuario y la contraseña están vacíos
        if (!username.trim() || !password.trim()) {
            setAlert({
                type: 'error',
                message: 'Por favor ingrese un nombre de usuario y una contraseña válidos.'
            });
            return;
        }

        // Verificar si el nombre de usuario contiene caracteres no permitidos
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            setAlert({
                type: 'error',
                message: 'El nombre de usuario solo puede contener letras, números y guiones bajos.'
            });
            return;
        }

        try {
            // Enviar la solicitud de inicio de sesión al servidor
            const response = await axios.post('http://localhost:3001/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Decodificar el token para obtener el rol del usuario
            const decodedToken = parseJwt(token);
            const role = decodedToken.role;

            // Validar el rol del usuario y redirigirlo al componente correspondiente
            if (role === 'supervisor') {
                window.location.href = '/supervisor'; // Redirigir al panel del supervisor
            } else if (role === 'admin') {
                window.location.href = '/administrador'; // Redirigir al panel del administrador
            } else {
                // Si el rol no es válido, mostrar un mensaje de error
                setAlert({
                    type: 'error',
                    message: 'Rol de usuario no válido'
                });
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar un mensaje de error
            setAlert({
                type: 'error',
                message: error.response.data.error
            });
            setTimeout(() => {
                setAlert(null);
            }, 4000);
        }
    };

    // Función para decodificar el token JWT
    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <h1 className="text-4xl font-bold text-white mb-4">Inicio de Sesión</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre de usuario" />
                </div>
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Contraseña:</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Contraseña" />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Iniciar Sesión
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

export default Login;
