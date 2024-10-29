const express = require('express');
const verifyToken = require('../middlewares/authmiddleware');
const { createLog, getLogs } = require('../controllers/logsController');
const router = express.Router();

router.post('/logs', verifyToken, createLog); 
router.get('/logs', verifyToken, getLogs);    

module.exports = router;
