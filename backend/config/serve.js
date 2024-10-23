const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Definindo uma rota simples
app.post('/register', (req, res) => {
  const userData = req.body;
  console.log('Dados recebidos:', userData);
  // Aqui você processaria os dados recebidos e salvaria no banco de dados
  res.status(201).send('Usuário registrado com sucesso!');
});

// Iniciar o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
