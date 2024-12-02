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
})

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
  

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});

