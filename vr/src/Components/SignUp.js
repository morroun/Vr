import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function SignUp() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeFirst = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangeLast = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = () => {
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setError('All fields are required');
      return;
    }

    Axios.post('http://localhost:3002/signUp', {
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        if (response.data.success) {
          console.log('Sign up successful');
          setError('');
          navigate('/'); // Redirect to the home or sign-in page after successful sign-up
        } else {
          console.error('Sign up failed:', response.data.message);
          setError(response.data.message || 'Sign up failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        setError(error.response?.data?.message || 'An error occurred during sign up.');
      });
  };

  return (
    <div>
      <h1>SignUp</h1>
      <br />
      <input type="text" value={firstName} onChange={handleChangeFirst} placeholder="First Name" />
      <br />
      <input type="text" value={lastName} onChange={handleChangeLast} placeholder="Last Name" />
      <br />
      <input type="text" value={email} onChange={handleChangeEmail} placeholder="email" />
      <br />
      <input type="text" value={password} onChange={handleChangePassword} placeholder="password" />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <h4>{error}</h4>
    </div>
  );
}