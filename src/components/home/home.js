import './home.css'
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

export default function Home() {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async() => {
    await logout();
    navigate("/login");
  }
  
  return (
    <div className='home-container'>
      <h1 className='home-title'>Kezdőlap</h1>
      <button className='logout-button' onClick={handleLogout}>Kijelentkezés</button>
    </div>
  )
}
