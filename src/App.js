import './App.css';
import { Routes, Route } from "react-router-dom";
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Home from './components/home/home';
import Layout from './components/layout';
import RequireAuth from './components/requireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="register" element={<Registration />}/>
        <Route path='login' element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />}/>
        </Route>
        
      </Route>
    </Routes>
    
  );
}

export default App;
