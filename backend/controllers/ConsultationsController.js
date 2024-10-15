const db = require('../db/database');

exports.getConsultations = (req, res) => {
  const role = req.query.role;
  const userId = req.query.userId;

  if (role === 'admin') {
    db.all('SELECT * FROM consultations', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ consultations: rows });
    });
  } else if (role === 'user' && userId) {
    db.all('SELECT * FROM consultations WHERE userId = ?', [userId], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ consultations: rows });
    });
  } else {
    res.status(403).json({ error: 'Papel de usuário inválido ou ID de usuário faltando' });
  }
};

exports.createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;
  db.run(
    'INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)',
    [userId, date, doctor, specialty, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};
