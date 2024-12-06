import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';

function DettagliPost() {

    const [idPostVisualizzare, setIdPostVisualizzare] = useState('');
    const [resultRequest, setResultRequest] = useState('');
    const [error, setError] = useState('');


    // Funzione per eseguire la ricerca dei post
    const filterRequest = async () => {
        try {
        // Effettua la richiesta GET al server
        const response = await fetch(
            `http://localhost:3000/api/filterRequest?ricercaParola=test&ricercaAnno=2024&idPostVisualizzare=${idPostVisualizzare}`,
            {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            }
        );

        const data = await response.json();

        if (response.status === 200) {

            setResultRequest(data.result);  // Aggiorna lo stato con i risultati della query

            
        } else {
            setError(data.message);  // Gestisci l'errore
            setResultRequest('');
        }
        } catch (error) {
        setError('Errore del server.');
        }
    };
    
    return(

        <>

        <Header />

        <div className="secondaParte">

            
            <div className="secondaParte_superiore">

                <a href="http://localhost:3001/"><button id="secondaParteBtn" type="button">Torna alla pagina principale</button></a>
                <button type="button" onClick={filterRequest}>Test</button>
                
                <h1>{resultRequest}</h1>
            </div>
            
        </div>

        </>
    );
}

export default DettagliPost;