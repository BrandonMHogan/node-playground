'use strict'

var express = require('express');

var routes = function(Book) {
    var router = express.Router();

    router.route('/')
        .post(function(req, res){
            var myBook = new Book(req.body);

            myBook.save();
            res.status(201).send(myBook);
        })
        .get(function(req,res) {

            // The query object which is passed into the book model
            var query = {};

            // If you limit the query object, you can prevent 
            // searches on things you dont want
            if(req.query.genre) {
                query.genre = req.query.genre;
            }

            Book.find(query, function(err, books) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            });
        });

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