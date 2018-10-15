const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/about');

//Routes for about
router.get('/', aboutController.RenderAbout);





module.exports = router;