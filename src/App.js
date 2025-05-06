import './App.css';
import { Routes, Route } from "react-router-dom";
import Registration from './components/registration/registration';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Registration />}/>
    </Routes>
    
  );
}

export default App;
