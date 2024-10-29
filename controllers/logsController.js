// controllers/logsController.js
const db = require('../database/db');
const WebSocket = require('ws');
const { getWebSocketServer } = require('../webSocketServer');
console.log(getWebSocketServer,"geetansh")

const createLog = (req, res) => {
  const { mood, anxiety_level, sleep_hours, sleep_quality, physical_activity, social_interaction, stress_level, symptoms } = req.body;
  console.log(req.user);
  const user_id = req.user.uid;
  const date = new Date().toISOString().split('T')[0];

  const query = `
    INSERT INTO user_logs (user_id, date, mood, anxiety_level, sleep_hours, sleep_quality, physical_activity, social_interaction, stress_level, symptoms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [user_id, date, mood, anxiety_level, sleep_hours, sleep_quality, physical_activity, social_interaction, stress_level, symptoms];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error saving log data', err });
    }

    // Create the log entry to send to clients
    const newLog = {
      log_id: this.lastID,
      user_id,
      date,
      mood,
      anxiety_level,
      sleep_hours,
      sleep_quality,
      physical_activity,
      social_interaction,
      stress_level,
      symptoms,
    };

    const wss = getWebSocketServer();
    console.log(wss)
    wss.clients.forEach(client => {
      console.log(client);
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newLog));
      }
    });

    res.status(201).json({ message: 'Log saved successfully', log_id: this.lastID });
  });
};

const getLogs = (req, res) => {
  const user_id = req.user.uid;
  const { startDate, endDate } = req.query;

  let query = `SELECT * FROM user_logs WHERE user_id = ?`;
  const params = [user_id];

  if (startDate && endDate) {
    query += ` AND date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving log data' });
    }
    res.status(200).json({ logs: rows });
  });
};

module.exports = { createLog, getLogs };
