const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/profissionais
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nome FROM profissionais');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ erro: 'Erro ao buscar profissionais' });
  }
});

module.exports = router;