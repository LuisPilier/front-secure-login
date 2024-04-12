import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import RestrictedRouteComponent from './components/RestrictedRouteComponent';
import SupervisorComponent from './components/SupervisorComponent';
import AdminComponent from './components/AdminComponent';
import { AuthProvider } from './AuthContext';
import WelcomeScreen from './components/WelcomeScreen';
import 'tailwindcss/tailwind.css';


const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/supervisor" element={<SupervisorComponent />} />
                <Route path="/administrador" element={<AdminComponent/>} />
                <Route path="/restricted-route" element={<RestrictedRouteComponent />} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
