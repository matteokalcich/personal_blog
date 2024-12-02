import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {

        navigate('/backoffice');

      } else {

        setError(data.message);
      }

    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore del server.');
    }
  };

  return (

    <>
    
      <Header></Header>

      <div className='divRender'>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="credenziali">

            <label>Username: </label>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>

          <div className="credenziali">

            <label>Password: </label>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
          </div>

          
          <button type='submit'>Login</button>


        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    
    </>
    
  );
}

export default Login;
