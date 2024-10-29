const express = require('express');
const verifyToken = require('../middlewares/authmiddleware');
const { getProfile, getUserData , VerifiedUser } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', verifyToken, getProfile);   
router.get('/user', verifyToken, getUserData);    
router.post('/login', verifyToken, VerifiedUser);    


module.exports = router;
