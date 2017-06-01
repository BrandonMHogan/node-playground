var express = require('express');
var app = express();

var port = process.env.PORT || 5001;
var bookRouter = require('./src/routes/bookRoutes');

app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter)

app.get('/', function (req, res) {
    res.render('index', {
        title: "Wassup",
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
