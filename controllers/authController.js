const router = require('express').Router();
const User = require('../models/User');
const authSevice = require('../services/authService');
const { TOKEN_COOKIE_NAME } = require('../config/config');


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    authSevice.login(username, password)
        .then((token) => {
            // console.log(token);
            res.cookie(TOKEN_COOKIE_NAME, token);
            res.redirect('/cubes');
        })
        .catch(error => {
            res.status('404').render('login', { error, title: 'Login Page' })
        });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', (req, res) => {
    const { username: user, password: pass, repeatPassword: repass } = req.body;
    let newUser = user.toLowerCase();
    if (pass !== repass) {
        res.render('register', { error: { message: 'Passwords missmatch' } });
        return;
    }
    if (pass.length < 6) {
        res.render('register', { error: { message: 'Passwords too short' } });
        return;
    }
    User.findOne({ username: newUser })
        .then(userFound => {
            console.log(userFound);
            if (userFound) {
                res.render('register', { error: { message: 'Username exists' } });
                return;
            }
            authSevice.register(newUser, pass)
                .then((user) => res.redirect('/auth/login'))
                .catch(error => res.render('register', { error, title: 'Register Page' }))
        })
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.redirect('/cubes');
});

module.exports = router;