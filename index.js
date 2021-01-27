const express = require('express');
const env = process.env.NODE_ENV.trim() || 'development';
const app = express();
const config = require('./config/config')[env];
const handlebars = require('express-handlebars');

app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));

app.engine('hbs', handlebars({
    extname: 'hbs',
}))
app.set('view engine', 'hbs');

app.use(express.static('public'));

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