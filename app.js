var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PaymentService = require("./services/PaymentService"); 
var exphbs  = require('express-handlebars');

//importamos el service

require('dotenv').config()
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const PaymentController = require("./controllers/PaymentController");

const PaymentInstance = new PaymentController(new PaymentService()); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/payment/new',(req,res)=>PaymentInstance.getMercadoPagoLink(req,res));

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

module.exports = app;

app.listen(4000);

