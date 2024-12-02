import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Lottie from 'lottie-react';
import loginLock from '../assets/animations/login_lock.json';
import successful_login from '../assets/animations/successful_login.json';
import '../styles/Login.css';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [correctCredentials, setCorrectCredentials] = useState(false);
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


        setCorrectCredentials(true);
        //navigate('/backoffice');

      } else {

        setError(data.message);
        setCorrectCredentials(false);
      }

    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore del server.');
    }
  };

  return (

    <>
    
      <Header />

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

          <div className="divBtnLogIn">

            <button className='btnLogIn' type='submit'>Login
            <Lottie id='lottie_login_lock' animationData={loginLock}/>

            </button>
            

          </div>

        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {correctCredentials && (
          <Lottie 
            animationData={successful_login} 
            loop={false} // Assicura che l'animazione venga riprodotta solo una volta
            onComplete={() => {
              setTimeout(() => {
                navigate('/'); // Naviga dopo 5 secondi
              }, 100); // 5000 ms = 5 secondi
            }}
          />
        )}

    </div>
    
    </>
    
  );
}

export default Login;
