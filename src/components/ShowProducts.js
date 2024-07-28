import React, { useEffect, useState } from 'react';
// useState se usa para asignar un valor a nuestras variables
// useEffect se usa para cuando se renderiza la paguina
import axios from 'axios';
// axios se usa para hacer peticiones a la api
import Swal from 'sweetalert2';
// sweetalert2 se usa para mostrar alertas en la paguina
import withReactContent from 'sweetalert2-react-content';
// withreactContent se usa para mostrar alertas en la paguina

const MySwal = withReactContent(Swal);

const ShowProducts = () => {
    const url = 'http://127.0.0.1:9000/productos';
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
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
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al cargar los productos',
            });
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
        </div>
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
    );
}

export default ShowProducts;