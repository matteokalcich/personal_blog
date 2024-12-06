import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import RicercaPost from '../components/RicercaPost';
import '../../styles/index.css';
import axios from 'axios';

function CreazionePost() {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state ? location.state.id : null; // Estrae id dallo stato, e gestisce il caso in cui sia undefined

    const [immagine, setimmagine] = useState(null);
    const [titoloPostInsert, setTitoloPostInsert] = useState('');
    const [descrizionePostInsert, setDescrizionePostInsert] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const filterRequestNew = async () => {
        const formData = new FormData();
    
        formData.append('idPost', id);
        formData.append('titoloPost', titoloPostInsert);
        formData.append('descrizionePost', descrizionePostInsert);
        
        if (immagine) {
            formData.append('file', immagine); // Aggiungi il immagine se presente
        }
    
        try {
            const response = await axios.post(
                `http://localhost:3000/api/createPost`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.status === 200) {
                setError('');
                setMessage('Operazione completata con successo.');
            } else {
                setError(response.message || 'Errore sconosciuto.');
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

            case 'crea':


                filterRequestNew(false);

                navigate('/backoffice');

                break;


            case 'annulla':

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
                <h2>Ciao, sei pronto a creare un post?</h2>
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

                        setimmagine(e.target.files[0]);
                    }}
                />

                <button type='submit' name='Annulla' onClick={() => handleClick('annulla')}>Annulla Modifiche</button>
                <button type='submit' name='creaPost' onClick={() => handleClick('crea')}>Crea Post</button>

            </form>
        
        </div>
    
        

    );

}


export default CreazionePost;