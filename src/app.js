//import modules
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { extname } = require('path');

//use modules
const app = express();

//settings 
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.html', exphbs.engine({
    defaultLayout: "main",
    extname: '.html'
}));
app.set('view engine', '.html');


//middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//export the module
module.exports = app;