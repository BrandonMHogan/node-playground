var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
    .get(function(req,res) {

        // The query object which is passed into the book model
        var query = {};

        // If you limit the query object, you can prevent 
        // searches on things you dont want
        if(req.query.genre) {
            query.genre = req.query.genre;
        }

        book.find(query, function(err, books) {
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        });
    });

// Route that takes the param and passes it into the book model
bookRouter.route('/books/:bookId')
    .get(function(req,res) {
            book.findById(req.params.bookId, function(err, books) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            });
        });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});