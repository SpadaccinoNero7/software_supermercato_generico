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

app.post('/api/utenti', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
