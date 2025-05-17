import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CrearProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    talla: '',
    color: '',
    stock: ''
  });

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Verificar si el usuario tiene permisos
  if (!usuario || usuario.roles !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleChange = e => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/productos', producto);
      alert('Producto creado con éxito');
      navigate('/bienvenida');
    } catch (error) {
      alert('Error al crear el producto');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="talla"
          placeholder="Talla (Ej. S, M, L, XL)"
          value={producto.talla}
          onChange={handleChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={producto.color}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={producto.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;
