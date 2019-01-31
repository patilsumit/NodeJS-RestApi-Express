
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

var expressHbs = require('express-handlebars');
var app = express();

mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine( 'hbs', expressHbs( { 
  extname: '.hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir  : [
    //  path to your partials
    __dirname + '/views/partials',
]
} ) );

app.set( 'view engine', 'hbs' );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
