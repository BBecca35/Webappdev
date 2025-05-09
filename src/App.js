import './App.css';
import { Routes, Route } from "react-router-dom";
import Registration from './components/registration/registration';
import Login from './components/login/login';

function App() {
  return (
    <Routes>
        <Route path="/register" element={<Registration />}/>
        <Route path='/login' element={<Login />} />
    </Routes>
    
  );
}

export default App;
