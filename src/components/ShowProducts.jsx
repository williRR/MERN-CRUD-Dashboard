import React, { useEffect, useState } from 'react';
// useState se usa para asignar un valor a nuestras variables
// useEffect se usa para cuando se renderiza la página
import axios from 'axios';
// axios se usa para hacer peticiones a la API
import Swal from 'sweetalert2';
// sweetalert2 se usa para mostrar alertas en la página
import withReactContent from 'sweetalert2-react-content';
// withReactContent se usa para mostrar alertas en la página
import { Pie } from 'react-chartjs-2';
// Pie se usa para crear la gráfica circular
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
// Chart, ArcElement, Tooltip y Legend se usan para registrar los componentes necesarios en Chart.js

Chart.register(ArcElement, Tooltip, Legend);

const MySwal = withReactContent(Swal);

const ShowProducts = () => {
    const url = 'http://127.0.0.1:9000/api';
    const [productos, setProductos] = useState([]);
    const [_id, setId] = useState('');
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

    // Determina la operación que se va a realizar
    const openModal = (op, _id, producto, descripcion, precio, cantidad) => {
        setId(_id);
        setProducto('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        setOperation(op);

        if (op === 1) {
            setTitulo('Agregar Producto');
        } else if (op === 2) {
            setTitulo('Editar Producto');
            setId(_id);
            setProducto(producto);
            setDescripcion(descripcion);
            setPrecio(precio);
            setCantidad(cantidad);
            document.getElementById('id').value = _id;
        }

        // Usando una función tradicional
        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500);
    };

    // Valida que todos los campos estén llenos
    const validateFields = () => {
        let parametros;
        let metodo;
        let id = document.getElementById('id').value; // Obtén el ID del campo oculto

        if (producto.trim() === '') {
            show_alert('El campo producto es requerido', 'error');
        } else if (descripcion.trim() === '') {
            show_alert('El campo descripcion es requerido', 'error');
        } else if (precio.toString().trim() === '') { // Convertir precio a string
            show_alert('El campo precio es requerido', 'error');
        } else if (cantidad.toString().trim() === '') { // Convertir cantidad a string
            show_alert('El campo cantidad es requerido', 'error');
        } else {
            parametros = { 
                producto: producto.trim(), 
                descripcion: descripcion.trim(), 
                precio: parseFloat(precio.toString().trim()), 
                cantidadEnStock: parseInt(cantidad.toString().trim()) 
            };

            if (operation === 1) {
                metodo = 'POST';
            } else if (operation === 2) {
                metodo = 'PUT';
            }
            enviarDatos(parametros, metodo, id); // Pasar el ID en la llamada
        }
    };

    // Función para enviar datos a la API
    const enviarDatos = async (parametros, metodo, id = '') => {
        try {
            // Añadir ID a la URL para PUT y DELETE
            const urlConId = id ? `${url}/${id}` : url;
            const respuesta = await axios({ method: metodo, url: urlConId, data: parametros });
            let tipo = respuesta.data.success ? 'success' : 'error';
            let mensaje = respuesta.data.message;
            show_alert(mensaje, tipo);
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click();
                await getProducts(); // Asegúrate de esperar a que se actualicen los productos
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
                enviarDatos({}, 'DELETE', id);
            } else {
                show_alert('El producto no fue eliminado', 'error');
            }
        });
    };

    // Datos para la gráfica circular
    const pieData = {
        labels: productos.map((producto) => producto.producto),
        datasets: [
            {
                label: 'Cantidad en Stock',
                data: productos.map((producto) => producto.cantidadEnStock),
                backgroundColor: productos.map(
                    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
                ),
                hoverOffset: 4,
            },
        ],
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
                                            <td>{producto.producto}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>${new Intl.NumberFormat('es-GT').format(producto.precio)}</td>
                                            <td>{producto.cantidadEnStock}</td>
                                            <td>
                                                <button onClick={() => openModal(2, producto._id, producto.producto, producto.descripcion, producto.precio, producto.cantidadEnStock)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                    <i className='fa-solid fa-edit'> Editar </i>
                                                </button>
                                                <button onClick={() => borrarProducto(producto._id, producto.producto)} className='btn btn-danger ms-2'>
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

                {/* Gráfica circular para mostrar el total de productos */}
                <div className="row mt-3">
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='d-flex justify-content-center'>
                            <Pie data={pieData} />
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
                                    <span className='input-group-text'>
                                        <i className='fa-solid fa-gift'> Producto </i>
                                    </span>
                                    <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={producto} onChange={(event) => setProducto(event.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        <i className='fa-solid fa-comment'> Descripción </i>
                                    </span>
                                    <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        <i className='fa-solid fa-dollar-sign'> Precio </i>
                                    </span>
                                    <input type='text' id='precio' className='form-control' placeholder='Precio' value={precio} onChange={(event) => setPrecio(event.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        <i className='fa-solid fa-list-ol'> Cantidad </i>
                                    </span>
                                    <input type='number' id='cantidad' className='form-control' placeholder='Cantidad' value={cantidad} onChange={(event) => setCantidad(event.target.value)} />
                                </div>

                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' id='btnCerrar'>Cerrar</button>
                                <button type='button' className='btn btn-dark' onClick={validateFields}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducts;
