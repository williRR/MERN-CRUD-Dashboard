import React, { useEffect, useState } from 'react';
// useState se usa para asignar un valor a nuestras variables
// useEffect se usa para cuando se renderiza la página
import axios from 'axios';
// axios se usa para hacer peticiones a la API
import Swal from 'sweetalert2';
// sweetalert2 se usa para mostrar alertas en la página
import withReactContent from 'sweetalert2-react-content';
// withReactContent se usa para mostrar alertas en la página

const MySwal = withReactContent(Swal);

const ShowProducts = () => {
    const url = 'http://127.0.0.1:3001/productos';
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [operation, setOperation] = useState(1); // 1 = agregar, 2 = editar
    const [titulo, setTitulo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    // determina la operacion se va a realizar
    const openModal = (op, id, producto, descripcion, precio, cantidad) => {
        setProducto('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        setOperation(op);

        if (op === 1) {
            setTitulo('Agregar Producto');
        } else if (op === 2) {
            setTitulo('Editar Producto');
            setProducto(producto);
            setDescripcion(descripcion);
            setPrecio(precio);
            setCantidad(cantidad);
            document.getElementById('id').value = id;
        }

        // Usando una función tradicional
        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500);
    };

    // valida que todos los campos esten llenos
    const validateFields = () => {
        let parametros;
        let metodo;

        if (producto.trim() === '') {
            show_alert('El campo producto es requerido', 'error');
        } else if (descripcion.trim() === '') {
            show_alert('El campo descripcion es requerido', 'error');
        } else if (precio.trim() === '') {
            show_alert('El campo precio es requerido', 'error');
        } else if (cantidad.trim() === '') {
            show_alert('El campo cantidad es requerido', 'error');
        } else {
            if (operation === 1) {
                parametros = { producto: producto.trim(), descripcion: descripcion.trim(), precio: precio.trim(), cantidad: cantidad.trim() };
                metodo = 'POST';
            } else if (operation === 2) {
                parametros = { producto: producto.trim(), descripcion: descripcion.trim(), precio: precio.trim(), cantidad: cantidad.trim() };
                metodo = 'PUT';
            }
            enviarDatos(parametros, metodo);
        }
    };

    const enviarDatos = async (parametros, metodo) => {
        try {
            const respuesta = await axios({ method: metodo, url: url, data: parametros });
            let tipo = respuesta.data[0];
            let mensaje = respuesta.data[1];
            show_alert(mensaje, tipo);
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click();
                getProducts();
            }
        } catch (error) {
            show_alert('Error en la solicitud', 'error');
        }
    };

    // Función para obtener los productos desde la API
    const getProducts = async () => {
        try {
            setLoading(true);
            const respuesta = await axios.get(url);
            setProductos(respuesta.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Función para mostrar alertas
    const show_alert = (mensaje, tipo) => {
        MySwal.fire({
            title: tipo === 'success' ? 'Éxito' : 'Error',
            text: mensaje,
            icon: tipo,
            confirmButtonText: 'OK'
        });
    };

    // Función para borrar productos
    const borrarProducto = (id, producto) => {
        MySwal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarDatos({ id }, 'DELETE');
            } else {
                show_alert('El producto no fue eliminado', 'error');
            }
        });
    };

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                <i className='fa-solid fa-circle-plus'> Agregar Producto </i>
                            </button>
                            {/* Botón para abrir el modal de agregar producto */}
                        </div>
                    </div>
                </div>

                {/* Tabla para mostrar los productos */}
                <div className="row mt-3">
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Producto</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {Array.isArray(productos) && productos.map((producto, index) => (
                                        <tr key={producto._id}>
                                            <td>{index + 1}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>${new Intl.NumberFormat('es-MX').format(producto.precio)}</td>
                                            <td>{producto.cantidadEnStock}</td>
                                            <td>
                                                <button onClick={() => openModal(2, producto._id, producto.nombre, producto.descripcion, producto.precio, producto.cantidadEnStock)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                    <i className='fa-solid fa-edit'> Editar </i>
                                                </button>
                                                <button onClick={() => borrarProducto(producto._id, producto.nombre)} className='btn btn-danger ms-2'>
                                                    <i className='fa-solid fa-trash'> Eliminar </i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal para agregar producto */}
                <div className='modal fade' id='modalProducts' tabIndex='-1' aria-labelledby='modalProductsLabel' aria-hidden='true'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='modalProductsLabel'>{titulo}</h5>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                <input type='hidden' id='id' />
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                    <input type='text' id='nombre' className='form-control' placeholder='Nombre del Producto' value={producto} onChange={(e) => setProducto(e.target.value)} />
                                </div>
                                {/* Campos adicionales para la descripción, precio y cantidad */}
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-align-left'></i></span>
                                    <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                                    <input type='number' id='precio' className='form-control' placeholder='Precio' value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-box'></i></span>
                                    <input type='number' id='cantidad' className='form-control' placeholder='Cantidad' value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                                <button onClick={() => validateFields()} type='button' className='btn btn-primary'>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProducts;
