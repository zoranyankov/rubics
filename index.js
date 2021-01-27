const env = process.env.NODE_ENV.trim() || 'development';
const app = require('express')();
const config = require('./config/config')[env];
const handlebars = require('express-handlebars');

app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));

app.engine('hbs', handlebars({
    extname: 'hbs',
}))
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
    // , (err, html) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(html);
    //     res.send(html)
    // })
})