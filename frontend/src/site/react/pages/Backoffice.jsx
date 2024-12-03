import React from 'react';
import Header from '../components/Header';
import '../../styles/index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import RicercaPost from '../components/RicercaPost';


function Backoffice() {

  const location = useLocation();

  const {username} = location.state;

  const navigate = useNavigate();

  const loginRedirect = () => {

    navigate('/');
  };

  const handleError = (errorMessage) => {
    console.error('Errore dal componente RicercaPost:', errorMessage);
  };


  return (

    <div className='paginaIntera'>

        <Header />

        <div className="welcome">
          <h2>Ciao {username}, benvenuto nel mio blog personale, spero ti piaccia</h2>
          <button type="button" onClick={loginRedirect}>
            LOGOUT
          </button>
        </div>

        <RicercaPost onError={handleError}/>


    </div>
    
  );
}

export default Backoffice;