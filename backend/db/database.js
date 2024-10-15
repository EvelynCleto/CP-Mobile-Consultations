const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./consultations.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    date TEXT NOT NULL,
    doctor TEXT NOT NULL,
    specialty TEXT NOT NULL,
    status TEXT NOT NULL
  )`);
});

module.exports = db;
