// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/usuarios/login', credenciales)
      .then(response => {
        alert('Login exitoso');
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        navigate('/bienvenida');
      })
      .catch(error => {
        alert('Credenciales incorrectas');
        console.error('Error al iniciar sesión:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={credenciales.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={credenciales.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
