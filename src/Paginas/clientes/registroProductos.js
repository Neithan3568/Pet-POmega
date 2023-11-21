import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

const RegistroProducto = () => {
  const [producto, setProducto] = useState({
    nombreProducto: '',
    precio: '',
    descripcion: ''
  });

  const { nombreProducto, precio, descripcion } = producto;
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const registerProducto = async () => {
    try {
      const response = await axios.post('http://localhost:8888/api/v1/devcamps/productos', producto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccessMessage('Producto registrado con éxito');
      setError('');
    } catch (error) {
      console.error('Error en el registro:', error);

      if (error.response) {
        console.log('Respuesta del servidor:', error.response);
        if (error.response.status === 500 && error.response.data && error.response.data.message) {
          setError('Error: ' + error.response.data.message);
        } else {
          setError('Error: Algo salió mal al registrar el producto');
        }
      } else {
        setError('Error en el servidor: ' + error.message);
      }
    }
  };

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerProducto();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Limpiar localStorage al cerrar sesión
    localStorage.removeItem('name');
    // Redirigir a la página de inicio de sesión
    // Puedes usar useHistory() o Link para redirigir según tu configuración de enrutamiento
    window.location.href = '/';
  };

  return (
    <div>
      <nav className='menu'>
        <label className='logo'>Registrar Producto</label>
        <ul className={`menu_items ${menuOpen ? 'show' : ''}`}>
          <li className='active'><Link to={"/homeC"}>Inicio</Link></li>
          <li><Link to={"#"}>Perfil</Link></li>
          <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
        </ul>
        <span className={`btn_menu ${menuOpen ? 'hide' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </span>
      </nav>
      <div className='form-container3'>
        <h1>Registro de Producto</h1>
        {error && (
          <div className='mensajeE'>
            {error}
          </div>
        )}
        {successMessage && (
          <div className='mensajeExito'>
            {successMessage}
          </div>
        )}
        <form autoComplete='off' onSubmit={onSubmit}>
          <div className='control3'>
            <label>Nombre del Producto</label>
            <input type='text' name='nombreProducto' id='nombreProducto' onChange={onChange} value={producto.nombreProducto} />
          </div>
          <div className='control3'>
            <label>Precio</label>
            <input type='text' name='precio' id='precio' onChange={onChange} value={producto.precio} />
          </div>
          <div className='control3'>
            <label>Descripción</label>
            <textarea name='descripcion' id='descripcion' onChange={onChange} value={producto.descripcion} />
          </div>
          <div className='control3'>
            <input type='submit' value='Registrar Producto' />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroProducto;
