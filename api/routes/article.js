const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

//Route for add article
router.get('/add', articleController.RenderAddArticle);

//Route for article
router.get('/', articleController.RenderArticles);

//Route for getting article by id
router.get('/:id', articleController.RenderArticleById);

//Route for editing article
router.get('/edit/:id', articleController.RenderEditArticle);

//Route for posting articles
router.post('/add', articleController.PostArticles);

//Route for deleting article
router.delete('/:id', articleController.DeleteArticles);

//Route for searching by author
router.post('/search', articleController.SearchByAuthor);

//Route for editing article
router.patch('/edit/:id', articleController.PatchArticles);




module.exports = router;