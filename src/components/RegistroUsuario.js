// src/components/RegistroUsuario.js
import React, { useState } from 'react';
import axios from 'axios';

function RegistroUsuario() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/usuarios', formulario)
      .then(response => {
        alert('Usuario registrado con éxito');
        console.log(response.data);
        // Limpiar el formulario si deseas
        setFormulario({
          nombre: '',
          apellido: '',
          email: '',
          password: ''
        });
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Usuario</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formulario.nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formulario.apellido}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formulario.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formulario.password}
        onChange={handleChange}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default RegistroUsuario;
