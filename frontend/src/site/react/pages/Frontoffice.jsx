import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RicercaPost from '../components/RicercaPost';
import '../../styles/index.css';

function Frontoffice() {

  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate('/login');
  };

  const handleError = (errorMessage) => {
    console.error('Errore dal componente RicercaPost:', errorMessage);
  };

  return (
    <>
      <div className="paginaIntera">

        <Header />

        <div className="welcome">
          <h2>Ciao, benvenuto nel mio blog personale, spero ti piaccia</h2>
          <button type="button" onClick={loginRedirect}>
            LOGIN
          </button>
        </div>

        <div className="introduzioneMioBlog">
          <p>
            Ciao, benvenuto nel mio blog personale, mi presento: mi chiamo Matteo Kalcich, ho 18 anni e
            studio informatica. Una cosa che mi piace fare durante il tempo libero è programmare per conto mio
            approfondendo aspetti di mio interesse.
          </p>
        </div>

        <RicercaPost onError={handleError} chiamante={'frontoffice'} />
      </div>
    </>
  );
}

export default Frontoffice;
