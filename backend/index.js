require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Crea il pool di connessioni PostgreSQL
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// Middleware per JSON
app.use(cors({
  origin: 'http://localhost:5173'  // l'URL del tuo frontend
}));
app.use(express.json());

// Endpoint di test
app.get('/api/utenti', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utenti ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
});

app.get('/api/categorie', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorie ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
});

app.get('/api/utenti/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM utenti WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Utente non trovato');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
});

/* app.post('/api/utenti', async (req, res) => {
  const { name, age, is_admin, date, password_utente, codice_utente } = req.body;
  try {
    const result = await pool.query(
  'INSERT INTO utenti (name, age, is_admin, date, password_utente, codice_utente) VALUES ($1, $2, $3, $4, $5, $6)',
   [name, age, is_admin, date, password_utente, codice_utente]
);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
}); */
app.post('/api/utenti', async (req, res) => {
  const { name, age, is_admin, date, password_utente, codice_utente } = req.body;

  try {
    // Controllo se esiste già un utente con lo stesso codice_utente
    const checkQuery = 'SELECT * FROM utenti WHERE codice_utente = $1';
    const checkResult = await pool.query(checkQuery, [codice_utente]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Utente già presente nel database' });
    }

    // Inserimento nuovo utente
    const insertQuery = `
      INSERT INTO utenti (name, age, is_admin, date )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [name, age, is_admin, date ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
});

app.post('/api/categorie', async (req, res) => {
  const { name } = req.body;
  try {
    // Controllo se esiste già un utente con lo stesso codice_utente
    const checkQuery = 'SELECT * FROM categorie WHERE name = $1';
    const checkResult = await pool.query(checkQuery, [name]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Categoria già presente nel database' });
    }

    // Inserimento nuovo utente
    const insertQuery = `
      INSERT INTO categorie (name)
      VALUES ($1)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [name]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
});

app.delete('/api/categorie/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM categorie WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Categoria non trovata');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore server');
  }
})

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
