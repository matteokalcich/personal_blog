import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';
import '../../styles/index.css';

const RicercaPost = ({ initialAnno = 2024, onError, chiamante }) => {
  const formParolaRef = useRef(null);
  const formAnnoRef = useRef(null);
  const navigate = useNavigate();

  const [parolaDaCercare, setParolaDaCercare] = useState('');
  const [annoScelto, setAnnoScelto] = useState(initialAnno);
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => { //ho fatto in modo che se cambia la variabile annoScelto allora eseguo la query per la ricerca per anno

    filterRequest(parolaDaCercare, annoScelto);

  }, [annoScelto]);

  // Funzione per eseguire la ricerca dei post
  const filterRequest = async (parolaDaCercare, annoScelto) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/filterRequest?ricercaParola=${parolaDaCercare}&ricercaAnno=${annoScelto}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        
        setPostList(data.result);
        setError('');
      } else {
        setError(data.message);
        setPostList([]);
        if (onError) onError(data.message);
      }
    } catch (error) {
      setError('Errore del server.');
      if (onError) onError('Errore del server.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formId = e.target.id;

    if (formId === 'ricercaParola') {
      filterRequest(parolaDaCercare, annoScelto);
    } else if (formId === 'ricercaAnno') {
      filterRequest(parolaDaCercare, annoScelto);
    }
  };


  const backofficeRender = () => {

    return (
      <div className='centroPagina'>
        <form ref={formParolaRef} onSubmit={handleSubmit} className='ricerca' id='ricercaParola'>
          <p id='ricerca'>RICERCA</p>
          <input
            type='text'
            name='parolaDaCercare'
            id='parolaDaCercare'
            onChange={(e) => setParolaDaCercare(e.target.value)}
            value={parolaDaCercare}
          />
          <button type='submit' name='cerca' id='cercaBtn'>
            CERCA
          </button>
        </form>

        <button type='button' id='newPostBtn' onClick={() => {

          navigate('/nuovoPost');

        }}>NUOVO POST</button>
  
        <form ref={formAnnoRef} onSubmit={handleSubmit} className='filtraAnno' id='ricercaAnno'>
          <button type='submit' name='primoPost' className='allDivFiltraAnno firstLastBtn'>
            <p>PRIMO</p>
          </button>
          <button
            type='button'
            name='precedenteAnnoPost'
            className='allDivFiltraAnno afterFirstBeforeLastBtn'
            onClick={() => setAnnoScelto(annoScelto - 1)}
          >
            <p>Precedente</p>
          </button>
  
          <div className='allDivFiltraAnno annoCorrente'>
            <p>Anno Scelto: {annoScelto}</p>
          </div>
  
          <button
            type='button'
            name='successivoAnnoPost'
            className='allDivFiltraAnno afterFirstBeforeLastBtn'
            onClick={() => setAnnoScelto(annoScelto + 1)}
          >
            <p>Successivo</p>
          </button>
  
          <button type='submit' name='ultimoPost' className='allDivFiltraAnno firstLastBtn'>
            <p>ULTIMO</p>
          </button>
        </form>
  
        <div className='post'>
          <PostList posts={postList} chiamanteP={chiamante} />
        </div>
  
        {error && <p className='error'>{error}</p>}
      </div>
    );

  }

  const frontofficeRender = () => {

    return (
      <div className='centroPagina'>
        <form ref={formParolaRef} onSubmit={handleSubmit} className='ricerca' id='ricercaParola'>
          <p id='ricerca'>RICERCA</p>
          <input
            type='text'
            name='parolaDaCercare'
            id='parolaDaCercare'
            onChange={(e) => setParolaDaCercare(e.target.value)}
            value={parolaDaCercare}
          />
          <button type='submit' name='cerca' id='cercaBtn'>
            CERCA
          </button>
        </form>
  
        <form ref={formAnnoRef} onSubmit={handleSubmit} className='filtraAnno' id='ricercaAnno'>
          <button type='submit' name='primoPost' className='allDivFiltraAnno firstLastBtn'>
            <p>PRIMO</p>
          </button>
          <button
            type='button'
            name='precedenteAnnoPost'
            className='allDivFiltraAnno afterFirstBeforeLastBtn'
            onClick={() => setAnnoScelto(annoScelto - 1)}
          >
            <p>Precedente</p>
          </button>
  
          <div className='allDivFiltraAnno annoCorrente'>
            <p>Anno Scelto: {annoScelto}</p>
          </div>
  
          <button
            type='button'
            name='successivoAnnoPost'
            className='allDivFiltraAnno afterFirstBeforeLastBtn'
            onClick={() => setAnnoScelto(annoScelto + 1)}
          >
            <p>Successivo</p>
          </button>
  
          <button type='submit' name='ultimoPost' className='allDivFiltraAnno firstLastBtn'>
            <p>ULTIMO</p>
          </button>
        </form>
  
        <div className='post'>
          <PostList posts={postList} chiamanteP={chiamante}/>
        </div>
  
        {error && <p className='error'>{error}</p>}
      </div>
    );

  }


  switch(chiamante){


    case 'frontoffice':

      return frontofficeRender();

    case 'backoffice':

      return backofficeRender();
  }


  


  
};

export default RicercaPost;
