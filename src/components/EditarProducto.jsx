import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    })
      .then(() => navigate('/admin/productos'))
      .catch(err => console.error('Error al actualizar producto:', err));
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label><br />
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} /><br />

        <label>Descripción:</label><br />
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} /><br />

        <label>Precio:</label><br />
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} /><br />

        <label>Stock:</label><br />
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} /><br /><br />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarProducto;
