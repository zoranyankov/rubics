const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login Page'});
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register Page'});
});

router.get('/logout', (req, res) => {
    res.redirect('/cubes');
});

module.exports = router;