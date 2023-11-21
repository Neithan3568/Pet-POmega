import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from "axios";
import Modal from 'react-modal';

const VerProductos = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productos, setProductos] = useState([]); // Cambia el nombre de las citas a productos
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Cambia el nombre de la variable
  const [nuevaInformacion, setNuevaInformacion] = useState({
    nombre: "",
    numeroDocumento: "",
  });
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    const fetchProductos = async () => { // Cambia el nombre de la función
      try {
        const response = await axios.get("http://localhost:8888/api/v1/devcamps/productos"); // Cambia la URL de las citas a productos
        setProductos(response.data.results); // Cambia el nombre de las citas a productos
      } catch (error) {
        console.error("Error al obtener productos:", error); // Cambia el mensaje de error
      }
    };

    fetchProductos(); // Cambia el nombre de la función
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  const handleEliminarProducto = async (productoId) => { // Cambia el nombre de la función y el parámetro
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?"); // Cambia el mensaje de confirmación
    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:8888/api/v1/devcamps/productos/${productoId}`); // Cambia la URL de las citas a productos
        const updatedProductos = productos.filter((producto) => producto._id !== productoId); // Cambia el nombre de las citas a productos
        setProductos(updatedProductos); // Cambia el nombre de las citas a productos
        setMensajeExito("Producto eliminado con éxito."); // Cambia el mensaje de éxito
      } catch (error) {
        console.error("Error al eliminar el producto:", error); // Cambia el mensaje de error
      }
    }
  };

  const handleEditarProducto = (producto) => { // Cambia el nombre de la función y el parámetro
    setProductoSeleccionado(producto); // Cambia el nombre de la variable
    setNuevaInformacion({
      nombre: producto.nombre,
      numeroDocumento: producto.numeroDocumento,
    });
    openModal();
  };

  const handleActualizarProducto = async () => { // Cambia el nombre de la función
    try {
      await axios.put(`http://localhost:8888/api/v1/devcamps/productos/${productoSeleccionado._id}`, nuevaInformacion); // Cambia la URL de las citas a productos
      const updatedProductos = productos.map((producto) => { // Cambia el nombre de las citas a productos
        if (producto._id === productoSeleccionado._id) {
          return {
            ...producto,
            ...nuevaInformacion
          };
        }
        return producto;
      });

      setProductos(updatedProductos); // Cambia el nombre de las citas a productos
      closeModal();
      setMensajeExito("Producto actualizado con éxito."); // Cambia el mensaje de éxito
    } catch (error) {
      console.error("Error al actualizar el producto:", error); // Cambia el mensaje de error
    }
  };

  const handleChangeNuevaInformacion = (e) => {
    setNuevaInformacion({
      ...nuevaInformacion,
      [e.target.name]: e.target.value
    });
  };

  const handleCerrarMensajeExito = () => {
    setMensajeExito("");
  };

  return (
    <div>
      <nav className='menu'>
        <label className='logo'>Agende Su Producto</label> {/* Cambia el texto del logo */}
        <ul className={`menu_items ${menuOpen ? 'show' : ''}`}>
          <li className='active'><Link to={"/homeC"}>Inicio</Link></li>
          <li><Link to={"#"}>Perfil</Link></li>
          <li><button onClick={handleLogout}>Cerrar Sesión</button></li> {/* Cambia el texto del botón */}
        </ul>
        <span className={`btn_menu ${menuOpen ? 'hide' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </span>
      </nav>
      <div className="mensajeCentrar">
        {mensajeExito && (
          <div className="mensaje-exito">
            <p>{mensajeExito}</p> <button onClick={handleCerrarMensajeExito}>&times;</button>
          </div>
        )}
      </div>
      <div className="centrar">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Número de Documento</th>
              <th scope="col">Eliminar</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => ( // Cambia el nombre de las citas a productos
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{producto.nombre}</td> {/* Cambia el nombre de las citas a productos */}
                <td>{producto.numeroDocumento}</td> {/* Cambia el nombre de las citas a productos */}
                <td>
                  <button className="eliminar" onClick={() => handleEliminarProducto(producto._id)}>
                    Eliminar
                  </button>
                </td>
                <td>
                  <button className="editar" onClick={() => handleEditarProducto(producto)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Editar Producto"
          >
            {productoSeleccionado && (
              <div className="modal-content">
                <h2>Editar Producto</h2><br/>
                <input
                  type="text"
                  name="nombre"
                  value={nuevaInformacion.nombre}
                  onChange={handleChangeNuevaInformacion}
                /><br/><br/>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={nuevaInformacion.numeroDocumento}
                  onChange={handleChangeNuevaInformacion}
                /><br/><br/>
                <button onClick={handleActualizarProducto}>Actualizar</button><br/>
                <button onClick={closeModal}>Cerrar</button>


              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default VerProductos;


