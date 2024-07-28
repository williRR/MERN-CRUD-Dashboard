import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowProducts from './components/ShowProducts'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    // creando rutas , en este caso solo ruta /
    <BrowserRouter>
      <Routes>
        {/* el elemento que se tiene aqui es el componente  */}
        <Route path="/" element={<ShowProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
