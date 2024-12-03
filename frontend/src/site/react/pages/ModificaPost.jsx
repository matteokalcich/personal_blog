import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RicercaPost from '../components/RicercaPost';
import '../../styles/index.css';

function ModificaPost({idPost, username}) {

    const navigate = useNavigate();

    const [titoloPostInsert, setTitoloPostInsert] = useState('');
    const [descrizionePostInsert, setDescrizionePostInsert] = useState('');
    const [immaginePostInsert, setImmaginePostInsert] = useState('');
    const [error, setError] = useState('');

    // Funzione per eseguire la ricerca dei post
    const filterRequest = async (elimina) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/changePost`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: `${idPost}`, titoloPost: `${titoloPostInsert}`, descrizionePost: `${descrizionePostInsert}`, pathFotoPost: `${immaginePostInsert}`}),
                }
            );

            const data = await response.json();

            if (response.status === 200) {

                setError('');
                
            } else {

                setError(data.message);
            }

        } catch (error) {

            console.error('Errore durante il filtro:', error);
            setError('Errore del server.');

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

    }

    const handleClick = (t) => {

        switch(t){

            case 'modifica':



                break;


            case 'elimina':

                break;
        }
    }


    const loginRedirect = () => {
  
      navigate('/');
    };

    return (

        <div className='paginaIntera'>
        
            <Header />

            <div className="welcome">
                <h2>Ciao {username}, sei pronto a modificare/eliminare il post?</h2>
                <button type="button" onClick={loginRedirect}>
                    LOGOUT
                </button>
            </div>

            <form action="" onSubmit={handleSubmit}>

                <input type="text" name="titoloPostToInsert" placeholder="Titolo" onChange={(e) => {

                    setTitoloPostInsert(e.target.value);

                }}/>
                <textarea name="descrizionePostToInsert" placeholder="Descrizione" onChange={(e) => {

                    setDescrizionePostInsert(e.target.value);

                }}/>

                <input type="file" name="immaginePostToInsert" />
                <button type="submit" name="Annulla" onClick={() => handleClick('annulla')}>Annulla Modifiche</button>
                <button type="submit" name="modificaPost" onClick={() => handleClick('modifica')}>Modifica Post</button>
                <button type="submit" name="eliminaPost" onClick={() => handleClick('elimina')}>Elimina Post</button>

            </form>
        
        </div>
    
        

    );

}


export default ModificaPost;