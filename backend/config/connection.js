// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Configuração do Pool do PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'loja_virtual',
  password: 'Admin',
  port: 5433,
});

// Middleware
app.use(cors()); // Para permitir requisições de outros domínios
app.use(bodyParser.json()); // Para interpretar o JSON

app.post('/register', async (req, res) => {
  const {
    uid,
    full_name,
    cpf,
    email,
    city,
    state,
    cep,
    complement,
    gender,
    phone,
    birthdate,
  } = req.body;

  try {
    // Verifique se o email já existe no banco de dados
    const emailExistsQuery = 'SELECT * FROM users WHERE email = $1';
    const emailExists = await pool.query(emailExistsQuery, [email]);

    if (emailExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email já existe' });
    }

    // Insira os dados no banco de dados
    const insertUserQuery = `
      INSERT INTO users (uid, full_name, cpf, email, city, state, cep, complement, gender, phone, birthdate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`;
      
    const values = [
      uid,
      full_name,
      cpf,
      email,
      city,
      state,
      cep,
      complement,
      gender,
      phone,
      birthdate,
    ];

    const result = await pool.query(insertUserQuery, values);

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: result.rows[0], // Retorna os dados do usuário registrado
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
