import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Lottie from 'lottie-react';
import loginLock from '../../assets/animations/login_lock.json';
import successful_login from '../../assets/animations/successful_login.json';
import '../../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [correctCredentials, setCorrectCredentials] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Stato per mostrare l'animazione
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Aggiungi la classe 'loading' al bottone per attivare l'animazione
    const loginButton = document.querySelector('.btnLogIn');
    loginButton.classList.add('loading');
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        setCorrectCredentials(true);
      } else {
        setError(data.message);
        setCorrectCredentials(false);
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore del server.');
    } finally {
      // Rimuovi la classe 'loading' una volta che la risposta è arrivata
      loginButton.classList.remove('loading');
    }
  };
  

  return (
    <>
      <Header />

      <div className='divRender'>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className='credenziali'>
            <label>Username: </label>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />
          </div>

          <div className='credenziali'>
            <label>Password: </label>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>

          <div className='divBtnLogIn'>
            <button className='btnLogIn' type='submit'>
              Login
              <Lottie id='lottie_login_lock' animationData={loginLock} />
            </button>
            {correctCredentials && (
              <div className='test'>
                <Lottie
                  animationData={successful_login}  // Animazione
                  loop={false}
                  onComplete={() => {
                    setTimeout(() => {
                      navigate('/backoffice', { state: { username } });
                    }, 100);
                  }}
                  className='lottieCheckLogin'
                />
              </div>
            )}
          </div>
        </form>
      </div>

      

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default Login;
