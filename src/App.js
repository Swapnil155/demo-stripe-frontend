import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCar from "./components/AddCars";

import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AddCars" element={<AddCar />} />
      </Routes>
    </Router>
  );
}

export default App;
