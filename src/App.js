import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Checkout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
