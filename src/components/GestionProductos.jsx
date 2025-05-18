import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/productos')
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      fetch(`/productos/${id}`, { method: 'DELETE' })
        .then(() => {
          setProductos(prev => prev.filter(p => p.id !== id));
        })
        .catch(err => console.error('Error al eliminar:', err));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Productos</h2>
      <button onClick={() => navigate('/crear-producto')} style={{
        marginBottom: '1rem',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        + Nuevo producto
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>S/. {producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <button onClick={() => navigate(`/admin/productos/editar/${producto.id}`)} style={{
                  backgroundColor: '#ffc107',
                  border: 'none',
                  padding: '5px 10px',
                  marginRight: '5px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Editar</button>
                <button onClick={() => handleEliminar(producto.id)} style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestionProductos;
