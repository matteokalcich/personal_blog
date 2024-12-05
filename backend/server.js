const express = require('express');
const cors = require('cors');
const mysql = require('mysql');


const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
      origin: '*',
  })
);


app.use(express.json());


//per db
const con = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_kalcich'
});



app.post('/api/login', (req, res) => {

    const { username, password } = req.body;
  
    const query = 'SELECT * FROM tUtente WHERE userName = ? AND passw = ?';
  
    con.query(query, [username, password], (err, result) => {
      if (err) {
        console.error('Errore nella query:', err);
        return res.status(500).json({ message: 'Errore del server.' });
      }
  
      if (result.length > 0) {
        return res.status(200).json({ message: 'Login riuscito.' });
      } else {
        return res.status(401).json({ message: 'Credenziali non valide.' });
      }
    });
});

app.get('/api/filterRequest', (req, res) => {

  let ricercaParola = req.query.ricercaParola;
  let ricercaAnno = req.query.ricercaAnno;

  console.log('Parametri ricevuti: ', ricercaParola, ' e ', ricercaAnno);

  const query = 'SELECT * FROM tPost WHERE descrizionePost LIKE ? AND YEAR(dataCreazione) = ?';
  const searchPattern = `%${ricercaParola}%`; // Aggiungi i caratteri % manualmente
  
  con.query(query, [searchPattern, ricercaAnno], (err, result) => {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ message: 'Errore del server.' });
    }
  
    if (result.length > 0) {
      return res.status(200).json({ result });
    } else {
      return res.status(404).json({ message: 'Nessuna corrispondenza trovata' });
    }
  });

});

app.get('/api/dettagliPost', (req, res) => {

  let ricercaParola = req.query.ricercaParola;
  let ricercaAnno = req.query.ricercaAnno;

  console.log('Parametri ricevuti: ', ricercaParola, ' e ', ricercaAnno);

  const query = 'SELECT * FROM tPost WHERE descrizionePost LIKE ? AND YEAR(dataCreazione) = ?';
  const searchPattern = `%${ricercaParola}%`; // Aggiungi i caratteri % manualmente
  
  con.query(query, [searchPattern, ricercaAnno], (err, result) => {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ message: 'Errore del server.' });
    }
  
    if (result.length > 0) {
      return res.status(200).json({ result });
    } else {
      return res.status(404).json({ message: 'Nessuna corrispondenza trovata' });
    }
  });

});

app.post('/api/changePost', (req, res) => {
  let { idPost, titoloPost, descrizionePost, pathFotoPost, elimina } = req.body;

  console.log(Number(idPost), '- ', titoloPost, '- ', descrizionePost, '- ', pathFotoPost, '- ', elimina);

  if (elimina) {
    // Prima elimina i record correlati dalla tabella tModificaPost perchè cè la foreign key
    const deleteModificaPostQuery = 'DELETE FROM tModificaPost WHERE idPost = ?';
    con.query(deleteModificaPostQuery, [idPost], (err, result) => {
        if (err) {
            console.error('Errore nella query di eliminazione da tModificaPost:', err);
            return res.status(500).json({ message: 'Errore del server.' });
        }

        // Ora elimina il post dalla tabella tPost
        const deletePostQuery = 'DELETE FROM tPost WHERE idPost = ?';
        con.query(deletePostQuery, [idPost], (err, result) => {
            if (err) {
                console.error('Errore nella query di eliminazione da tPost:', err);
                return res.status(500).json({ message: 'Errore del server.' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Post non trovato.' });
            }

            return res.status(200).json({ successful: 'true' });
        });
    });
}
 else {
      // Modifica il post
      const updateQuery = 'UPDATE tPost SET titoloPost = ?, descrizionePost = ?, pathFotoPost = ? WHERE idPost = ?';
      con.query(updateQuery, [titoloPost, descrizionePost, pathFotoPost, idPost], (err, result) => {
          if (err) {
              console.error('Errore nella query di modifica:', err);
              return res.status(500).json({ message: 'Errore del server.' });
          }

          if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'Post non trovato.' });
          }

          // Aggiungi o aggiorna la tabella tModificaPost
          const selectQuery = 'SELECT * FROM tModificaPost WHERE idPost = ?';
          con.query(selectQuery, [idPost], (err, result) => {
              if (err) {
                  console.error('Errore nella query di selezione per tModificaPost:', err);
                  return res.status(500).json({ message: 'Errore del server.' });
              }

              let query;
              if (result.length > 0) {
                  // Se esiste già un record, aggiorna la data
                  query = 'UPDATE tModificaPost SET dataModificaPost = NOW() WHERE idPost = ?';
              } else {
                  // Altrimenti, inserisci un nuovo record
                  query = 'INSERT INTO tModificaPost (idPost, dataModificaPost) VALUES (?, NOW())';
              }

              con.query(query, [idPost], (err, result) => {
                  if (err) {
                      console.error('Errore nella query per tModificaPost:', err);
                      return res.status(500).json({ message: 'Errore del server.' });
                  }

                  return res.status(200).json({ successful: 'true' });
              });
          });
      });
  }
});


// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});

