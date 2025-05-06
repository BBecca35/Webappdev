import React from 'react'
import { useState } from 'react';
import './registration.css';
import axiosInstance from '../../api/axiosInstance';

const REGISTER_URL = '/register'

export default function Registration() {
  const[username, setUsername] = useState(""); 
  const[password, setPassword] = useState("");
  const[passwordAgain, setPasswordAgain] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !passwordAgain.trim()) {
      alert("Az összes mezőt kötelező kitölteni!");
      return;
    }

    try{
      const response = await axiosInstance.post(REGISTER_URL, 
        JSON.stringify({username, password}),
        {
          headers: {'Content-Type' : 'application/json'}
        }
      );

      alert("Sikeres Regisztráció!");
    }catch(error){
      console.error(error);
    }

  }

  return (
    <div className='registration'>
      <div className='registration-container'>
        <h1 className='registration-title'>Regisztráció</h1>
        <input className='input' 
          type='text' 
          placeholder='Felhasználónév'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          >
        </input>
        <input className='input' 
          type='password' 
          placeholder='Jelszó'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          >
        </input>
        <input className='input' 
          type='password' 
          placeholder='Jelszó ismét'
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          >
        </input>
        <button className='submit-button'
          onClick={(e) => handleSubmit(e)}
        >Regisztráció</button>
      </div>
    </div>
    
  )
}
