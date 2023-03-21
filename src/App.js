import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AddCar from "./components/AddCars";

import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./utils/PrivateRoutes";

function App() {
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Checkout />} />
          <Route path="/AddCars" element={<AddCar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
