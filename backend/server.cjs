// server.cjs — Escala360
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

// Inicializa o app
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Teste de conexão com o banco
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Conexão com o banco de dados estabelecida!');
    connection.release();
  } catch (err) {
    console.error('❌ Erro ao conectar no banco de dados:', err.message);
  }
})();

// 🔹 Servir arquivos estáticos da pasta raiz (fora do backend)
app.use(express.static(path.join(__dirname, '..')));

// 🔹 Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'home.html'));
});

// 🔹 Importa e usa as rotas da API
const profissionaisRoutes = require('./routes/profissionais.js');
app.use('/api/profissionais', profissionaisRoutes);

// 🔹 Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: '🚀 API Escala360 rodando com sucesso!' });
});

// 🔹 Rota 404 padrão
app.use((req, res) => {
  res.status(404).send('<h2>404 - Página não encontrada</h2>');
});
const plantoesRoutes = require('./routes/plantoes.js');
const substituicoesRoutes = require('./routes/substituicoes.js');
const escalasRoutes = require('./routes/escalas.js');

app.use('/api/plantoes', plantoesRoutes);
app.use('/api/substituicoes', substituicoesRoutes);
app.use('/api/escalas', escalasRoutes);

// 🔹 Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});