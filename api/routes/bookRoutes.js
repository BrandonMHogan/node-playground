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
    router.use('/:bookId', function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {
            if(err) {
                res.status(500).send(err);
            }
            else if(book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('No book found');
            }
        });
    });
    router.route('/:bookId')
        .get(function(req,res) {
            res.json(req.book);
        })
        .put(function(req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            
            req.book.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.book);
                }
            });
        })
        .patch(function(req, res) {

            // Deletes the id from the body
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.book);
                }
            });
        });

    return router;
};

module.exports = routes;