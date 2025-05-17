// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsuariosList from './components/UsuariosList';
import RegistroUsuario from './components/RegistroUsuario';
import Login from './components/Login';
import Bienvenida from './components/Bienvenida';
import CrearProducto from './components/CrearProducto'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Bienvenido</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<UsuariosList />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
