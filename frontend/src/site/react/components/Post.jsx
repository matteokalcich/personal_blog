import '../../styles/index.css';
import { useNavigate } from 'react-router-dom';

function Post({ id, titolo, dataCreazione, imgSrc, descrizione, chiamante }) {

  const navigate = useNavigate();

  const redirectToModificaPost = () => {
    navigate('/modificaPost', { state: { id } }); // Ho aggiunto 'state' per passare l'id correttamente
  };

  const postFrontOffice = () => {
    return (
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
  };

  const postBackOffice = () => {
    return (
      <div className="postDB">
        <div className="headerPostDB">
          <p>{dataCreazione}</p>
          <h3>{titolo}</h3>
        </div>
        <div className="corpoPostDB">
          <h1>Colegamento Per pagina con modifica post (richiesta get con parametro l'id)</h1>
          <img className="immaginePostDB" src={imgSrc} alt="" />
          <p>{descrizione}</p>
        </div>
        <div className="postDBright">
          <button type="button" onClick={redirectToModificaPost}><p>MODIFICA O ELIMINA</p></button>
        </div>
      </div>
    );
  };

  // Condizione per decidere quale renderizzare in base a 'chiamante'
  if (chiamante === 'frontoffice') {
    return postFrontOffice();
  } else if (chiamante === 'backoffice') {
    return postBackOffice();
  }

  // Caso di fallback se 'chiamante' non è definito
  return null;
}

export default Post;
