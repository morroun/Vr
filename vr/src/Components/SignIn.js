import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Axios from 'axios'
export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
  const handleSignIn = () => {
    if (email === '' || password === '') {
      setErrorMessage('Please fill out all fields.');
      return;
    }
  
    Axios.post('http://localhost:3002/signIn', { email, password })
      .then(response => {
        if (response.data.success) {
          console.log('Sign in successful');
          setErrorMessage('');
          navigate('/'); 
        } else {
          console.log('Error:', response.data.message);
          setErrorMessage(response.data.message || 'Wrong password or email. Please try again.');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setErrorMessage(error.response?.data?.message || 'An error occurred during login.');
      });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
        <h1>SIGN IN</h1>
        <br/>
        <input type="text" value={email}  onChange={handleChangeEmail} placeholder="email"/>
        <br/>
        <input type="text" value={password}  onChange={handleChangePassword} placeholder="password"/>
        <br/>
        <button onClick={() => handleSignIn()} >LogIn</button>
        <br/>
        <Link to="/SignUp">Don't have an account?</Link>
        <br/>
        <h4>{errorMessage}</h4>
    </div>
  )
}
