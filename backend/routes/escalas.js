const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/escalas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.id, e.data, p.nome AS profissional
      FROM escalas e
      JOIN profissionais p ON p.id = e.profissional_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar escalas:', error);
    res.status(500).json({ erro: 'Erro ao buscar escalas' });
  }
});

// POST /api/escalas
router.post('/', async (req, res) => {
  const { data, profissional_id } = req.body;
  if (!data || !profissional_id)
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });

  try {
    await db.query('INSERT INTO escalas (data, profissional_id) VALUES (?, ?)', [data, profissional_id]);
    res.status(201).json({ mensagem: 'Escala cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar escala:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar escala' });
  }
});

module.exports = router;
