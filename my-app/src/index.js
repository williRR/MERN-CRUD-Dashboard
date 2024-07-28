import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// importanto libreria que ocupare en este proyecto
//Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Importa el archivo CSS de Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
//Importa el archivo JS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';



// se renderizara a partir del root del html que se encuentra en App.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);