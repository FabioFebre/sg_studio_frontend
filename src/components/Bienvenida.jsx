import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Bienvenida() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    if (usuario?.roles === 'admin') {
      fetch('/productos')
        .then((res) => res.json())
        .then((data) => setTotalProductos(data.length))
        .catch((error) => console.error('Error al obtener productos:', error));
    }
  }, [usuario]);

  if (!usuario) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0 }}>Panel Administrativo</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>Hola, {usuario.nombre}</span>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={{ marginTop: '2rem' }}>
        {usuario.roles === 'admin' ? (
          <div>
            <h2 style={{ color: '#333' }}>Estadísticas generales</h2>

            <div style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              margin: '1rem 0',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              maxWidth: '350px'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Total de productos</h3>
              <p style={{ fontSize: '2.5rem', color: '#28a745', margin: 0 }}>{totalProductos}</p>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '5px', color: '#555' }}>
            <p>No tienes permisos para crear productos.</p>
          </div>
        )}
      </main>
      <button
        onClick={() => navigate('/admin/productos')}
        style={{
          marginTop: '1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Ir a gestión de productos
      </button>

    </div>
  );
}

export default Bienvenida;
