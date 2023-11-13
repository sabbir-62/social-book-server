const express = require('express');
const { processRegister } = require('../controllers/userController');
const { userLogin } = require('../controllers/loginController');

const router = express.Router();

// user route area 
router.post('/register', processRegister)
router.post('/login', userLogin)

module.exports = router;