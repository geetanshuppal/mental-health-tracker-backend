const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'mental_health.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      mood INTEGER,
      anxiety_level INTEGER,
      sleep_hours INTEGER,
      sleep_quality TEXT,
      physical_activity TEXT,
      social_interaction TEXT,
      stress_level INTEGER,
      symptoms TEXT
    )
  `);
});

module.exports = db;
