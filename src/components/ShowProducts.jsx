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
    const [productos, setProductos] = useState([]);// Estado para almacenar los productos con un arrray vacio
    const [_id, setId] = useState(''); // Estado para almacenar el ID del producto , para almcaenar el id del producto
    const [producto, setProducto] = useState('');// Estado para almacenar el nombre del producto
    const [descripcion, setDescripcion] = useState('');// Estado para almacenar la descripción del producto
    const [precio, setPrecio] = useState('');// Estado para almacenar el precio del producto
    const [cantidad, setCantidad] = useState('');// Estado para almacenar la cantidad del producto
    const [operation, setOperation] = useState(1); // 1 = agregar, 2 = editar
    const [titulo, setTitulo] = useState('');// Estado para almacenar el titulo del modal
    const [loading, setLoading] = useState(false);// Estado para almacenar el estado de carga
    const [error, setError] = useState(null);// Estado para almacenar el error

    // Llama a la función getProducts para obtener los productos desde la API
    useEffect(() => {
        getProducts();
    }, [])



    // Función para obtener los productos desde la API
         const getProducts = async () => {
            try {
                // para intentar ejecutar el codigo que puede lanzar excepciones
                setLoading(true); //indica que la operacion de carga esta en proceso
                const respuesta = await axios.get(url);// realiza solicitud http 
                setProductos(respuesta.data);
                setLoading(false); // indica la operacion de carga ha finalizado
            } catch (err) {
                setError(err); // captura el error
                setLoading(false); // indica la operacion de carga ha finalizado , aunque sucedio un error 
            }
        };
   
;


    // Determina la operación que se va a realizar
    const openModal = (op, _id, producto, descripcion, precio, cantidad) => {
        setId(_id); // establece el id del producto
        setProducto(''); // establece el nombre del producto
        setDescripcion(''); //  establece la descripcion del producto
        setPrecio(''); //   establece el precio del producto
        setCantidad(''); // establece la cantidad del producto
        setOperation(op);// establece la operacion a realizar , 1 = agregar, 2 = editar

        if (op === 1) {
            setTitulo('Agregar Producto'); // establece el titulo del modal
        } else if (op === 2) {
            setTitulo('Editar Producto');
            setId(_id); // establece el id del producto
            setProducto(producto);
            setDescripcion(descripcion);
            setPrecio(precio);
            setCantidad(cantidad);
            document.getElementById('id').value = _id; 
        }

        // elemento DOM para enfocar un elemento después de 500 ms
        // Usando una función tradicional  para enfocar un elemento después de 500 ms
        window.setTimeout(function () {
            document.getElementById('nombre').focus(); // Enfoca el elemento con el ID 'nombre' después de 500 ms
        }, 500);
    };



        // Función para enviar datos a la API
        const enviarDatos = async (parametros, metodo, id = '') => {
            try {
                // contruye  la URL con el ID si se proporciona, de lo contrario usa la URL base
                const urlConId = id ? `${url}/${id}` : url;
                // realiza la solicitud http
                const respuesta = await axios({ method: metodo, url: urlConId, data: parametros });
                // muestra un mensaje de exito o error según la respuesta de la API
                let tipo = respuesta.data.success ? 'success' : 'error';
                let mensaje = respuesta.data.message;
                // mostarmos el mensaje de exito o error
                show_alert(mensaje, tipo);

                // si la respuesta es exitosa, cierra el modal
                if (tipo === 'success') {
                    document.getElementById('btnCerrar').click();
                    // Actualiza los productos en el estado
                    await getProducts(); // Refresca la lista de productos
                }
            } catch (error) {
                show_alert('Error en la solicitud', 'error');
            }
        };
    
        
        const validateFields = async () => {
            let parametros;
            let metodo;
            let id = document.getElementById('id').value; // Obtén el ID del campo oculto

        // Valida los campos del formulario
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
        
                try {
                    await enviarDatos(parametros, metodo, id); // Espera a que la solicitud se complete
                    // Mueve el mensaje de exito aquí, después de que se haya completado la solicitud
                    if (operation === 1) {
                        show_alert('Producto agregado correctamente', 'success');
                    } else if (operation === 2) {
                        show_alert('Producto editado correctamente', 'success');
                    }
                } catch (error) {
                    // Muestra un mensaje de error si la solicitud falla
                    show_alert('Error al guardar el producto', 'error');
                }
            }
        };
        


// Función para mostrar alertas con SweetAlert2 usando la instancia MySwal
const show_alert = (mensaje, tipo) => {
    MySwal.fire({
        title: tipo === 'Éxito' ? 'Error' : 'Exito', // Corrección del operador ternario
        text: mensaje,
        icon: tipo.toLowerCase(), // Asegúrate de que el icono esté en minúsculas
        confirmButtonText: 'OK'
    });
};


    // Función para eliminar productos
    //con SweetAlert2 usando la instancia MySwal
    const borrarProducto = (id) => {
        MySwal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${url}/${id}`)
                    .then(() => {
                        // Actualiza los productos en el estado
                        setProductos(productos.filter(producto => producto._id !== id));
                        show_alert('Producto eliminado correctamente', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                        show_alert('Hubo un error al eliminar el producto', 'error');
                    });
            }
        });
    };
    

// Datos para la gráfica circular

// Calcula el total de productos en stock
const totalProductos = productos.reduce((total, producto) => total + producto.cantidadEnStock, 0);

const pieData = {
    // usamos map para iterar sobte el array de productos y obtener los datos necesarios
    labels: productos.map((producto) => producto.producto),
    datasets: [
        {
            label: 'Cantidad en Stock',
            data: productos.map((producto) => ((producto.cantidadEnStock / totalProductos) * 100).toFixed(1)),
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
                                {/* Verifica si 'productos' es un array y, si es así, itera sobre cada elemento del array*/} 
                                    {Array.isArray(productos) && productos.map((producto, index) => (
                                        // Aquí va el contenido que se renderiza para cada producto
                                        <tr key={producto._id}>
                                            <td>{index + 1}</td>
                                            <td>{producto.producto}</td>
                                            <td>{producto.descripcion}</td>
                                            {/* Formatea el precio con la moneda GTQ */}
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
                                    {/* Input para el nombre del producto */}
                                    <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={producto} onChange={(event) => setProducto(event.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        <i className='fa-solid fa-comment'> Descripción </i>
                                    </span>
                                    {/* Input para la descripción del producto */}
                                    <input type='text' id='descripcion' className='form-control' placeholder='Descripción' value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        <i className='fa-solid fa-dollar-sign'> Precio </i>
                                    </span>
                                    {/* Input para el precio del producto */}
                                    <input type='text' id='precio' className='form-control' placeholder='Precio' value={precio} onChange={(event) => setPrecio(event.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        {/* Input para la cantidad del producto */}
                                        <i className='fa-solid fa-list-ol'> Cantidad </i>
                                    </span>
                                    <input type='number' id='cantidad' className='form-control' placeholder='Cantidad' value={cantidad} onChange={(event) => setCantidad(event.target.value)} />
                                </div>

                            </div>
                            <div className='modal-footer'>
                                {/* Botones para cerrar el modal y guardar los datos */}
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
// Exporta el componente ShowProducts
export default ShowProducts;
