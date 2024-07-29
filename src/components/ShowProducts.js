import React, { useEffect, useState } from 'react';
// useState se usa para asignar un valor a nuestras variables
// useEffect se usa para cuando se renderiza la página
import axios from 'axios';
// axios se usa para hacer peticiones a la API
import Swal from 'sweetalert2';
// sweetalert2 se usa para mostrar alertas en la página
import withReactContent from 'sweetalert2-react-content';
// withreactContent se usa para mostrar alertas en la página

const MySwal = withReactContent(Swal);

const ShowProducts = () => {
    const url = 'http://127.0.0.1:9000/api/producto';
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const respuesta = await axios.get(url);
            setProductos(respuesta.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
           
        }
    };

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                <i className='fa-solid fa-circle-plus'> Agregar Producto </i>
                            </button>
                            {/* Botón para abrir el modal de agregar producto */}
                        </div>
                    </div>
                </div>

                {/* tabla para mostrar los productos */}
                <div className="row mt-3">
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Producto</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Categoría</th>
                                        <th>Cantidad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {productos.map((producto, index) => (
                                        <tr key={productos._id}>
                                            <td>{index + 1}</td>
                                            <td>{setProducto.nombre}</td>
                                            <td>{setProductos.descripcion}</td>
                                            <td>${new Intl.NumberFormat('es-MX').format(setPrecio.precio)}</td>
                                            <td>{setCategoria.categoria}</td>
                                            <td>{setCantidad.cantidadEnStock}</td>
                                            <td>
                                                <button className='btn btn-warning'>
                                                    <i className='fa-solid fa-edit'> Editar </i>
                                                </button>
                                                <button className='btn btn-danger'>
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

                {/* AGREGAR PRODUCTO */}
                <div className='modal fade' id='modalProducts' tabIndex='-1' aria-labelledby='modalProductsLabel' aria-hidden='true'>
                    {/* Contenido del modal */}
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='modalProductsLabel'>Agregar Producto</h5>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                {/* Formulario para agregar producto */}
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                                <button type='button' className='btn btn-primary'>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProducts;
