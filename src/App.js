import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
