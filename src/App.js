// Code for the App component goes here
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

    // creando rutas , en este caso solo ruta /
    <BrowserRouter>
      <Routes>
        {/* el elemento que se tiene aqui es el componente  */}
        <Route path="/" element={} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
