// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/productos') // Ajusta a tu backend
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

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
    <div>      
      {/* MODAL */}
      {mostrarModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '400px',
            width: '100%',
            position: 'relative'
          }}>
            {/* BOTÓN PARA CERRAR */}
            <button
              onClick={() => setMostrarModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>

            {/* FORMULARIO DE LOGIN */}
            <form onSubmit={handleSubmit}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>

              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={credenciales.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={credenciales.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL: PRODUCTOS */}
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
          <h2>Bienvenido a la Tienda</h2>
          <button
            onClick={() => setMostrarModal(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '20px'
            }}
          >
          Login
          </button>

        </header>

        <div style={{ padding: '20px' }}>
          <h3>Productos disponibles</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {productos.map(producto => (
              <div key={producto.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                <h4>{producto.nombre}</h4>
                <p>Precio: ${producto.precio}</p>
                <p>{producto.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
