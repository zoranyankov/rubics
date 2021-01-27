const express = require('express');
const env = process.env.NODE_ENV.trim() || 'development';
const config = require('./config')[env];
const handlebars = require('express-handlebars');

function expressConfig (app){
    app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));

    app.engine('hbs', handlebars({
        extname: 'hbs',
    }))
    app.set('view engine', 'hbs');

    app.use(express.static('public'));
}

module.exports = expressConfig;