// src/components/UsuariosList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('/usuarios')
      .then(response => {
        console.log('Datos recibidos del backend:', response.data);
        setUsuarios(response.data);
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      {usuarios.length === 0 ? (
        <p>Cargando usuarios o no hay registros.</p>
      ) : (
        <ul>
          {usuarios.map(usuario => (
            <li key={usuario.id}>
              <strong>{usuario.nombre} {usuario.apellido}</strong> <br />
              {usuario.email} <br />
              Fecha de registro: {new Date(usuario.fecha_registro).toLocaleDateString()} <br />
              Activo: {usuario.activo ? 'Sí' : 'No'}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsuariosList;
