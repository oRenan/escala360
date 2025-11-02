// 📂 backend/routes/plantoes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// ===============================
// 🔹 GET /api/plantoes
// ===============================
router.get('/', async (req, res) => {
  try {
    // Seleciona todos os plantões existentes no banco
    const [rows] = await db.query('SELECT * FROM plantoes ORDER BY data, hora_inicio');
    res.json(rows);
  } catch (error) {
    console.error('❌ Erro ao buscar plantões:', error);
    res.status(500).json({ erro: 'Erro ao buscar plantões' });
  }
});

// ===============================
// 🔹 POST /api/plantoes
// ===============================
router.post('/', async (req, res) => {
  console.log('📩 Dados recebidos no POST /api/plantoes:', req.body);

  const { data, hora_inicio, hora_fim, id_funcao, id_local } = req.body;

  // Verificação básica
  if (!data || !hora_inicio || !hora_fim || !id_funcao || !id_local) {
    console.log('⚠️ Campos ausentes:', { data, hora_inicio, hora_fim, id_funcao, id_local });
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  try {
    // Executa o INSERT no banco
    await db.query(
      'INSERT INTO plantoes (data, hora_inicio, hora_fim, id_funcao, id_local) VALUES (?, ?, ?, ?, ?)',
      [data, hora_inicio, hora_fim, id_funcao, id_local]
    );

    console.log('✅ Novo plantão cadastrado com sucesso!');
    res.status(201).json({ mensagem: 'Plantão cadastrado com sucesso!' });

  } catch (error) {
    // Mostra erro detalhado no terminal
    console.error('❌ Erro ao cadastrar plantão:', error.sqlMessage || error.message);
    res.status(500).json({ erro: 'Erro ao cadastrar plantão' });
  }
});

module.exports = router;
