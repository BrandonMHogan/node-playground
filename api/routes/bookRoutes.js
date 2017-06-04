/* jshint node: true */
'use strict';

var express = require('express');

var routes = function(Book) {
    var router = express.Router();

    var bookController = require('../controllers/bookController')(Book);

    router.route('/')
        .post(bookController.post)
        .get(bookController.get);

    // Route that takes the param and passes it into the book model
    router.route('/:bookId')
        .get(function(req,res) {
            Book.findById(req.params.bookId, function(err, books) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            });
        });

    return router;
};

module.exports = routes;