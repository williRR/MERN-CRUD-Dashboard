import { BrowserRouter, Router,Routers } from "react-router-dom";
import ShowProducts from "./components/ShowProducts";

function App() {
  return (
      <broswerRouter>
        <Routers>        
         <Route path="/" element={<ShowProducts></ShowProducts>}> </Route>
        </Routers>
      </broswerRouter>


  );
}

export default App;
