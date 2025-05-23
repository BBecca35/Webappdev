import { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './login.css';
import Alert from '../alertmessage/alert';
import { jwtDecode } from "jwt-decode";
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LOGIN_URL = '/api/auth/login';

export default function Login() {
  const[username, setUsername] = useState(""); 
  const[password, setPassword] = useState("");
  const{setAuth, auth} = useAuth();
  const[alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async(e) => {
    e.preventDefault();
    const showAlert = (message, type = 'warning') => {
      setAlert({ message, type });
    };

    if (!username.trim() || !password.trim()) {
      showAlert("Az összes mezőt kötelező kitölteni!");
      return;
    }

    try{
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({username, password}),
        {
          headers: {'Content-Type' : 'application/json'},
          withCredentials:true
        }
      );

      const accessToken = jwtDecode(response.data.accessToken);
      const userId = accessToken.UserInfo.id;
      const role = accessToken.UserInfo.role;
      setAuth({accessToken: response.data.accessToken, UserInfo: {
        id: userId,
        username: username,
        role: role
      }});
      localStorage.setItem("auth", JSON.stringify({ userId, username, role, accessToken }));
      //console.log(auth.UserInfo.id);
      setUsername("");
      setPassword("");
      navigate(from, { replace: true});
      
    }catch(error){
      if(error.response){
        const {status} = error.response;
        if(status === 404){
          showAlert("A felhasználó nem létezik!", "error");
        }
        else if(status === 401){
          showAlert("Hibás felhasználónév vagy jelszó!", "error");
        }
        else{
          showAlert("Hiba történt a bejelentkezés során", "error");
        }
      }
      else{
        showAlert("Váratlan hiba történt!", "error");
        console.log(error);
      }
    }

  }

  const handleNavigate = () => {
    navigate("/register");
  }
  
  return (
    <div className='login'>
      {alert && (
        <Alert
          className="alert-message"
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className='login-container'>     
        <h1 className='login-title'>Bejelentkezés</h1>
        <div className='field'>
          <FontAwesomeIcon
            className='icon'
            icon={faUser}
            size='xl'
          />
          <input className='input' 
            type='text' 
            placeholder='Felhasználónév'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
          </input>
        </div>
        <div className='field'>
          <FontAwesomeIcon
            className='icon'
            icon={faLock}
            size='xl'
          />
          <input className='input' 
            type='password' 
            placeholder='Jelszó'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           >
          </input>
        </div>

        <div className='buttons'>
          <button className='login-button'
            onClick={(e) => handleSubmit(e)}
          >Belépés</button>
          <button className='register-button'
            onClick={handleNavigate}
          >Regisztráció</button>
        </div>
      </div>
    </div>
  )
}
