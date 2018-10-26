const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/about');

const ensureAuthenticated = require('../authentication/auth');

//Routes for about
router.get('/', ensureAuthenticated, aboutController.RenderAbout);





module.exports = router;