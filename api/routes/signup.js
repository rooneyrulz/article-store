const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup');

//Route for signup
router.get('/signup', signupController.RenderSignup);

router.post('/signup', signupController.SignupUser);

module.exports = router;