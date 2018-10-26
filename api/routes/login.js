const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');

router.get('/login', loginController.RenderLogin);

router.post('/login', loginController.LoginUser);

router.get('/logout', loginController.LogoutUser);

module.exports = router;