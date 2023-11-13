const express = require('express');
const { registration, login, activate } = require('../Controllers/AUTH');
const router = express.Router();

// user auth.....
router.post('/registration',registration);
router.post('/activate/:id',activate);
router.post('/login',login);









module.exports = router;