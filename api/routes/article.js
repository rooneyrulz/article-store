const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

const ensureAuthenticated = require('../authentication/auth');

//Route for add article
router.get('/add', ensureAuthenticated, articleController.RenderAddArticle);

//Route for article
router.get('/', ensureAuthenticated, articleController.RenderArticles);

//Route for getting article by id
router.get('/:id', ensureAuthenticated, articleController.RenderArticleById);

//Route for editing article
router.get('/edit/:id', ensureAuthenticated, articleController.RenderEditArticle);

//Route for posting articles
router.post('/add', ensureAuthenticated, articleController.PostArticles);

//Route for deleting article
router.delete('/:id', ensureAuthenticated, articleController.DeleteArticles);

//Route for searching by author
router.post('/search', ensureAuthenticated, articleController.SearchByAuthor);

//Route for editing article
router.patch('/edit/:id', ensureAuthenticated, articleController.PatchArticles);




module.exports = router;