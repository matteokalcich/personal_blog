import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import RicercaPost from '../components/RicercaPost';
import '../../styles/index.css';
import axios from 'axios';

function ModificaPost({username}) {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state ? location.state.id : null;; // Estrae id dallo stato, e gestisce il caso in cui sia undefined

    const [file, setFile] = useState(null); //per l'immagine
    const [titoloPostInsert, setTitoloPostInsert] = useState('');
    const [descrizionePostInsert, setDescrizionePostInsert] = useState('');
    const [, setError] = useState('');
    const [, setMessage] = useState('');

    const filterRequestNew = async (elimina) => {
        const formData = new FormData();
    
        formData.append('idPost', id);
        formData.append('titoloPost', titoloPostInsert);
        formData.append('descrizionePost', descrizionePostInsert);
        formData.append('elimina', elimina);
        
        if (file) {
            formData.append('file', file); // Aggiungi il file se presente
        }
    
        try {
            const response = await axios.post(
                `http://localhost:3000/api/changePostNew`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            const data = response.data;
    
            if (response.status === 200) {
                setError('');
                setMessage('Operazione completata con successo.');
            } else {
                setError(data.message || 'Errore sconosciuto.');
            }
        } catch (error) {
            setError('Errore del server.');
        }
    };
    

    const handleSubmit = async (e) => {

        e.preventDefault();

    }

    const handleClick = (t) => {

        switch(t){

            case 'modifica':


                filterRequestNew(false);

                navigate('/backoffice');

                break;


            case 'elimina':

                filterRequestNew(true);

                navigate('/backoffice');

                break;
        }
    }


    const loginRedirect = () => {
  
      navigate('/');
    };

    return (

        <div className='paginaIntera'>
        
            <Header />

            <div className='welcome'>
                <h2>Ciao {username}, sei pronto a modificare/eliminare il post?</h2>
                <button type='button' onClick={loginRedirect}>
                    LOGOUT
                </button>
            </div>

            <form action='' onSubmit={handleSubmit} encType='multipart/form-data'>

                <input type='text' name='titoloPostToInsert' placeholder='Titolo' onChange={(e) => {

                    setTitoloPostInsert(e.target.value);

                }}/>
                <textarea name='descrizionePostToInsert' placeholder='Descrizione' onChange={(e) => {

                    setDescrizionePostInsert(e.target.value);

                }}/>

                <input type='file' name='immaginePostToInsert' id='file'

                    onChange={(e) => {

                        setFile(e.target.files[0]);
                    }}
                />
                <button type='submit' name='Annulla' onClick={() => handleClick('annulla')}>Annulla Modifiche</button>
                <button type='submit' name='modificaPost' onClick={() => handleClick('modifica')}>Modifica Post</button>
                <button type='submit' name='eliminaPost' onClick={() => handleClick('elimina')}>Elimina Post</button>

            </form>
        
        </div>
    
        

    );

}


export default ModificaPost;