import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import './navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className='navbar-title'>Coral zenelejátszó</h1>
      <button onClick={handleLogout} className="logout-button">Kijelentkezés</button>
    </nav>
  );
}
