/*jslint node: true */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var db;

// This enviroment variable is set in the gulp file for testing
if(process.env.ENV == 'test')
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();

// Sets some HTTP headers for security
app.use(helmet());

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API');
});

app.post('/w', function(req, res) {
    res.status(200);
    res.json(req.body);
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});

// Must be exported so that it can be used in the integration test
module.exports = app;