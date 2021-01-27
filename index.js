const express = require('express');
const app = express();

require('./config/express')(app);

app.get('/', (req, res) => {
    res.redirect('/products');
})
app.get('/products', (req, res) => {
    res.render('home');
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/products/create', (req, res) => {
    res.render('create');
})