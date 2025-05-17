import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Bienvenida() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    // Solo cargar productos si es admin
    if (usuario?.roles === 'admin') {
      fetch('/productos')
        .then((res) => res.json())
        .then((data) => {
          setTotalProductos(data.length); // cantidad total
        })
        .catch((error) => {
          console.error('Error al obtener productos:', error);
        });
    }
  }, [usuario]);

  if (!usuario) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>¡Bienvenido/a, {usuario.nombre}!</h1>
      <p>Has iniciado sesión correctamente.</p>

      {usuario.roles === 'admin' ? (
        <div>
          <h2>Área de administración</h2>

          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '1.5rem',
            margin: '1rem 0',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '300px'
          }}>
            <h3>Total de productos</h3>
            <p style={{ fontSize: '2rem', color: '#4CAF50' }}>{totalProductos}</p>
          </div>

          <button onClick={() => navigate('/crear-producto')}>
            Crear nuevo producto
          </button>
        </div>
      ) : (
        <p>No tienes permisos para crear productos.</p>
      )}
    </div>
  );
}

export default Bienvenida;
