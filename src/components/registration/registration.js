import React from 'react'
import { useState } from 'react';
import './registration.css';
import Alert from '../alertmessage/alert';
import axiosInstance from '../../api/axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const REGISTER_URL = '/register';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Registration() {
  const[username, setUsername] = useState(""); 
  const[password, setPassword] = useState("");
  const[passwordAgain, setPasswordAgain] = useState("");
  const[wrongUsername, setWrongUsername] = useState(false);
  const[wrongPassword, setWrongPassword] = useState(false);
  const[twoPasswordnotequals, setTwoPasswordnotequals] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    if (e.target.value.length > 0 && (e.target.value.length < 4 || (!USER_REGEX.test(e.target.value)))) {
        setActiveTooltip('username');
        setWrongUsername(true);
    } else {
        setActiveTooltip(null);
        setWrongUsername(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length > 0 && (e.target.value.length < 8 || (!PWD_REGEX.test(e.target.value)))) {
        setActiveTooltip('password');
        setWrongPassword(true);
    } else {
        setActiveTooltip(null);
        setWrongPassword(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setPasswordAgain(e.target.value);

    if (e.target.value.length > 0 && (e.target.value !== password)) {
        setActiveTooltip('confirmPassword');
        setTwoPasswordnotequals(true);
        
    } else {
        setActiveTooltip(null);
        setTwoPasswordnotequals(false);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const showAlert = (message, type = 'warning') => {
      setAlert({ message, type });
    };

    if (!username.trim() || !password.trim() || !passwordAgain.trim()) {
      showAlert("Az összes mezőt kötelező kitölteni!");
      return;
    }

    if(wrongUsername){
      showAlert("A felhasználónév mező helytelenül lett kitöltve!");
      return;
    }

    if(wrongPassword){
      showAlert("A jelszó mező helytelenül lett kitöltve!");
      return;
    }

    if(twoPasswordnotequals){
      showAlert("A két jelszónak meg kell egyeznie!");
      return;
    }

    try{
      const response = await axiosInstance.post(REGISTER_URL, 
        JSON.stringify({username, password}),
        {
          headers: {'Content-Type' : 'application/json'}
        }
      );

      showAlert("Sikeres Regisztráció!");
    }catch(error){
      console.error(error);
    }

  }

  return (
    <div className='registration'>
      {alert && (
        <Alert
          className="alert-message"
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className='registration-container'>
        <h1 className='registration-title'>Regisztráció</h1>
        <div className='username-input'>
          <FontAwesomeIcon
            className='icon'
            icon={faUser}
            size='xl'
          />
          <input className='input' 
            type='text' 
            placeholder='Felhasználónév'
            value={username}
            onChange={handleUsernameChange}
          >
          </input>
          {activeTooltip === 'username' && (
            <div className="tooltip">
              A felhasználónévnek legalább 4 karakter hosszúnak kell lennie, és csak betűket, számokat, kötőjelet vagy aláhúzást tartalmazhat.
            </div>
          )}
        </div>
        <div className='password-input'>
          <FontAwesomeIcon
            className='icon'
            icon={faLock}
            size='xl'
          />
          <input className='input' 
            type='password' 
            placeholder='Jelszó'
            value={password}
            onChange={handlePasswordChange}
           >
          </input>
          {activeTooltip === 'password' && (
            <div className="tooltip">
              A jelszónak legalább 8 karakter hosszúnak kell lennie. Továbbá tartalmaznia kell nagybetűtek és kisbetűket, egy számot és egy speciális karaktert, amik a következők lehetnek: !, @, #, $, %.
            </div>
          )}
        </div>
        <div className='password-again-input'>
          <FontAwesomeIcon
            className='icon'
            icon={faLock}
            size='xl'
          />
          <input className='input' 
            type='password' 
            placeholder='Jelszó ismét'
            value={passwordAgain}
            onChange={handleConfirmPasswordChange}
            >
          </input>
          {activeTooltip === 'confirmPassword' && (
            <div className="tooltip">
              A két jelszónak meg kell egyeznie!
            </div>
          )}
        </div>
        
        <button className='submit-button'
          onClick={(e) => handleSubmit(e)}
        >Regisztráció</button>
      </div>
    </div>
    
  )
}
