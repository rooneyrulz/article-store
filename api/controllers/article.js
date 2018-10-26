const mongoose = require('mongoose');
const Article = require('../models/article_schema');

//Render Add Article
exports.RenderAddArticle = (req, res, next) => {
    res.status(200).render('add_article', { message: 'Add Articles' });
}

//Post articles
exports.PostArticles = (req, res, next) => {

    if (req.body.title === "" || req.body.author === "" || req.body.message === "") {
        console.log(`empty fields found!`);
        res.status(404).render('server_error', { message: 'Not Found', error: 'Empty fields found...!' });
    } else {
        let article = new Article({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            author: req.body.author,
            message: req.body.message
        })
        article
            .save()
            .then(article => {
                console.log(`article saved!`);
                res.status(200).send(article);
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).render('server_error', { message: 'Server Error', error: err });
            });
    }
};

//Getting All Articles
exports.RenderArticles = (req, res, next) => {
    Article.find()
        .select("title author message _id")
        .exec()
        .then(articles => {
            if (articles.length < 1) {
                console.log(`articles not found!`);
                res.status(404).render('server_error', { message: 'Not Found', error: 'Articles not found...!' });
            } else {
                console.log(articles);
                res.status(200).render('articles', { message: 'Articles', articles: articles });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).render('server_error', { message: 'Server Error', error: err });
        });
}

//Get article by id
exports.RenderArticleById = (req, res, next) => {
    let articleId = req.params.id;
    Article.findById({ _id: articleId })
        .select("title author message _id")
        .exec()
        .then(article => {
            if (article.length < 1) {
                console.log(`articles not found!`);
                res.status(404).render('server_error', { message: 'Not Found', error: 'Articles not found...!' });
            } else {
                console.log(article);
                res.status(200).render('get_article', { message: 'Article', article: article });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).render('server_error', { message: 'Server Error', error: err });
        });
};

//Render edit article
exports.RenderEditArticle = (req, res, next) => {
    let articleId = req.params.id;

    Article.findById({ _id: articleId })
        .select("title author message _id")
        .exec()
        .then(article => {
            if (article.length < 1) {
                console.log(`articles not found!`);
                res.status(404).render('server_error', { message: 'Not Found', error: 'Articles not found...!' });
            } else {
                console.log(article);
                res.status(200).render('edit_article', { message: 'Edit Article', article: article });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).render('server_error', { message: 'Server Error', error: err });
        });
};


//Search Articles
exports.SearchByAuthor = (req, res, next) => {
    let articleAuthor = req.body.author;
    Article.findOne({ author: articleAuthor })
        .select("title author message _id")
        .exec()
        .then(article => {
            if (article.length < 1) {
                console.log(`articles not found!`);
                res.status(404).render('server_error', { message: 'Not Found', error: 'Articles not found...!' });
            } else {
                res.status(200).send(article);
                console.log(article);
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).render('server_error', { message: 'Server Error', error: err });
        });
};


//Delete articles
exports.DeleteArticles = (req, res, next) => {
    let articleId = req.params.id;

    Article.findById({ _id: articleId })
        .exec()
        .then(article => {
            if (article.length < 1) {
                console.log(`articles not found!`);
                res.status(404).render('server_error', { message: 'Not Found', error: 'Articles not found...!' });
            } else {
                Article.remove({ _id: articleId })
                    .exec()
                    .then(article => {
                        console.log(`article deleted`);
                        res.status(200).send(article);
                    })
                    .catch(err => {
                        console.log(err.message);
                        res.status(500).render('server_error', { message: 'Server Error', error: err });
                    });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).render('server_error', { message: 'Server Error', error: err });
        });
};


//Edit articles
exports.PatchArticles = (req, res, next) => {
    let articleId = req.params.id;

    Article.findById({ _id: articleId })
        .exec()
        .then(article => {
            if (article.length < 1) {
                console.log(`articles not found!`);
                res.status(404).render('server_error', { message: 'Not Found', error: 'Articles not found...!' });
            } else {
                let article = {
                    title: req.body.title,
                    author: req.body.author,
                    message: req.body.message
                };
                Article.update({ _id: articleId }, { $set: article })
                    .exec()
                    .then(article => {
                        res.status(200).send(article);
                        console.log(article);
                    })
                    .catch(err => {
                        console.log(err.message);
                        res.status(500).render('server_error', { message: 'Server Error', error: err });
                    });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).render('server_error', { message: 'Server Error', error: err });
        });
};