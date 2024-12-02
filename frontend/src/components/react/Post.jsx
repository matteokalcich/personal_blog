function Post({titolo, dataCreazione, imgSrc, descrizione}) {
    
    return(

        <div className="postDB">

            <div className="headerPostDB">

                <p>{dataCreazione}</p>
                <h3>{titolo}</h3>

            </div>

            <div className="corpoPostDB">

                <h1>Colegamento Per pagina con dettagli post (richiesta get con parametro l'id)</h1>
                <img className="immaginePostDB" src={imgSrc} alt="" />
                <p>{descrizione}</p>

            </div>

            
        </div>
    );
}

export default Post;