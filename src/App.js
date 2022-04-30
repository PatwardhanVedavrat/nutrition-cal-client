import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calculator } from "./Pages/Calculator";
import { Inventory } from "./Pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
