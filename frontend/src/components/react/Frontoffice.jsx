import React, { useState, useRef } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import PostList from './PostList';
//import '../styles/index.css';

function Frontoffice() {
  const formParolaRef = useRef(null);
  const formAnnoRef = useRef(null);

  const [parolaDaCercare, setParolaDaCercare] = useState('');
  const [annoScelto, setAnnoScelto] = useState(2024);
  const [postList, setPostList] = useState([]); // Usa lo stato per memorizzare i post
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginRedirect = () => {

    navigate('/login');
  }

  // Funzione per eseguire la ricerca dei post
  const filterRequest = async (parolaDaCercare, annoScelto) => {
    try {
      // Effettua la richiesta GET al server
      const response = await fetch(
        `http://localhost:3000/api/filterRequest?ricercaParola=${parolaDaCercare}&ricercaAnno=${annoScelto}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();

      if (response.status === 200) {


        setPostList(data.result);  // Aggiorna lo stato con i risultati della query

        
      } else {
        setError(data.message);  // Gestisci l'errore
        setPostList([]);
      }
    } catch (error) {
      console.error('Errore durante il filtro:', error);
      setError('Errore del server.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formId = e.target.id;

    if (formId === 'ricercaParola') {
      console.log('Form Parola inviato');
      filterRequest(parolaDaCercare, annoScelto);  // Esegui la ricerca
    } else if (formId === 'ricercaAnno') {
      console.log('Form Anno inviato');
      filterRequest(parolaDaCercare, annoScelto);  // Esegui la ricerca
    }
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

        <div className="centroPagina">
          <form ref={formParolaRef} onSubmit={handleSubmit} className="ricerca" id="ricercaParola">
            <p id="ricerca">RICERCA</p>
            <input
              type="text"
              name="parolaDaCercare"
              id="parolaDaCercare"
              onChange={(e) => setParolaDaCercare(e.target.value)}
              value={parolaDaCercare}
            />
            <button type="submit" name="cerca" id="cercaBtn">
              CERCA
            </button>
          </form>

          <form ref={formAnnoRef} onSubmit={handleSubmit} className="filtraAnno" id="ricercaAnno">
            <button type="submit" name="primoPost" className="allDivFiltraAnno firstLastBtn">
              <p>PRIMO</p>
            </button>
            <button type="submit" name="precedenteAnnoPost" className="allDivFiltraAnno afterFirstBeforeLastBtn" onClick={() => {

              setAnnoScelto(annoScelto - 1);
            }}>
              <p>Precedente</p>
            </button>

            <div className="allDivFiltraAnno annoCorrente">
              <p>Anno Scelto: {annoScelto}</p>
            </div>

            <button type="submit" name="successivoAnnoPost" className="allDivFiltraAnno afterFirstBeforeLastBtn" onClick={() => {

              setAnnoScelto(annoScelto + 1);
            }}>
              <p>Successivo</p>
            </button>

            <button type="submit" name="ultimoPost" className="allDivFiltraAnno firstLastBtn">
              <p>ULTIMO</p>
            </button>
          </form>

          <div className="post">

            <PostList posts={postList} />

          </div>
        </div>
      </div>

      
    </>
  );
}

export default Frontoffice;
