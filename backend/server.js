const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const axios = require('axios');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, 'assets/images');

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(fileUpload());
app.use(express.json());
app.use('/assets/images', express.static('assets/images/'));

// Connessione al database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_kalcich',
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM tUtente WHERE userName = ? AND passw = ?';

  con.query(query, [username, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Errore del server.' });
    if (result.length > 0) return res.status(200).json({ message: 'Login riuscito.' });
    return res.status(401).json({ message: 'Credenziali non valide.' });
  });
});

app.get('/api/filterRequest', (req, res) => {
  const { ricercaParola, ricercaAnno } = req.query;
  const query = 'SELECT * FROM tPost WHERE descrizionePost LIKE ? AND YEAR(dataCreazione) = ?';
  const searchPattern = `%${ricercaParola}%`;

  con.query(query, [searchPattern, ricercaAnno], (err, result) => {
    if (err) return res.status(500).json({ message: 'Errore del server.' });
    if (result.length > 0) return res.status(200).json({ result });
    return res.status(404).json({ message: 'Nessuna corrispondenza trovata' });
  });
});

app.get('/api/dettagliPost', (req, res) => {
  const { ricercaParola, ricercaAnno } = req.query;
  const query = 'SELECT * FROM tPost WHERE descrizionePost LIKE ? AND YEAR(dataCreazione) = ?';
  const searchPattern = `%${ricercaParola}%`;

  con.query(query, [searchPattern, ricercaAnno], (err, result) => {
    if (err) return res.status(500).json({ message: 'Errore del server.' });
    if (result.length > 0) return res.status(200).json({ result });
    return res.status(404).json({ message: 'Nessuna corrispondenza trovata' });
  });
});

app.post('/api/changePostNew', async (req, res) => {
  const { idPost, titoloPost, descrizionePost, elimina } = req.body;
  const uploadedFile = req.files ? req.files.file : null;

  let pathFotoPost = null;
  if (uploadedFile) {
    const uploadPath = path.join(UPLOAD_DIR, uploadedFile.name);
    try {
      await uploadedFile.mv(uploadPath);
      pathFotoPost = 'assets/images/' + uploadedFile.name;
    } catch (err) {
      return res.status(500).json({ message: 'Errore nel caricamento del file.' });
    }
  }

  if (elimina === 'true') {
    const deleteModificaPostQuery = 'DELETE FROM tModificaPost WHERE idPost = ?';
    con.query(deleteModificaPostQuery, [idPost], (err) => {
      if (err) return res.status(500).json({ message: 'Errore del server.' });

      const deletePostQuery = 'DELETE FROM tPost WHERE idPost = ?';
      con.query(deletePostQuery, [idPost], (err) => {
        if (err) return res.status(500).json({ message: 'Errore del server.' });
        res.status(200).json({ successful: 'true' });
      });
    });
  } else {
    const updateQuery = 'UPDATE tPost SET titoloPost = ?, descrizionePost = ?, pathFotoPost = ? WHERE idPost = ?';
    con.query(updateQuery, [titoloPost, descrizionePost, pathFotoPost, idPost], (err) => {
      if (err) return res.status(500).json({ message: 'Errore del server.' });

      const selectQuery = 'SELECT * FROM tModificaPost WHERE idPost = ?';
      con.query(selectQuery, [idPost], (err, result) => {
        if (err) return res.status(500).json({ message: 'Errore del server.' });

        const query = result.length > 0
          ? 'UPDATE tModificaPost SET dataModificaPost = NOW() WHERE idPost = ?'
          : 'INSERT INTO tModificaPost (idPost, dataModificaPost) VALUES (?, NOW())';

        con.query(query, [idPost], (err) => {
          if (err) return res.status(500).json({ message: 'Errore del server.' });
          res.status(200).json({ successful: 'true' });
        });
      });
    });
  }
});

app.post('/api/createPost', async (req, res) => {
  const { titoloPost, descrizionePost } = req.body;
  const uploadedFile = req.files ? req.files.file : null;

  let pathFotoPost = null;
  if (uploadedFile) {
    const uploadPath = path.join(UPLOAD_DIR, uploadedFile.name);
    try {
      await uploadedFile.mv(uploadPath);
      pathFotoPost = 'assets/images/' + uploadedFile.name;
    } catch (err) {
      return res.status(500).json({ message: 'Errore nel caricamento del file.' });
    }
  }

  const insertQuery = 'INSERT INTO tPost (titoloPost, descrizionePost, pathFotoPost, dataCreazione) VALUES (?, ?, ?, NOW())';
  con.query(insertQuery, [titoloPost, descrizionePost, pathFotoPost], (err) => {
    if (err) return res.status(500).json({ message: 'Errore del server.' });
    return res.status(200).json({ message: 'Post creato con successo.' });
  });
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
