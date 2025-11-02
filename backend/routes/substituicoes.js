const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/substituicoes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, data, titular_id, substituto_id FROM substituicoes');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar substituições:', error);
    res.status(500).json({ erro: 'Erro ao buscar substituições' });
  }
});

// POST /api/substituicoes
router.post('/', async (req, res) => {
  const { data, titular_id, substituto_id } = req.body;
  if (!data || !titular_id || !substituto_id)
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });

  try {
    await db.query(
      'INSERT INTO substituicoes (data, titular_id, substituto_id) VALUES (?, ?, ?)',
      [data, titular_id, substituto_id]
    );
    res.status(201).json({ mensagem: 'Substituição cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar substituição:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar substituição' });
  }
});

module.exports = router;
