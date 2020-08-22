var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const PaymentController = require("./controllers/PaymentController");

const PaymentInstance = new PaymentController(new PaymentService()); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/payment/new',(req,res)=>PaymentInstance.getMercadoPagoLink(req,res));

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

module.exports = app;
