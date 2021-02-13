const router = require('express').Router();
const User = require('../models/User');
const authSevice = require('../services/authService');
const { TOKEN_COOKIE_NAME, ENGLISH_ALFANUMERIC_PATT } = require('../config/config');
const { isAuthorized, isLogged } = require('../middlewares/guards');


router.get('/login', isAuthorized, (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isAuthorized, (req, res) => {
    const { username, password } = req.body;
    if (username.length < 5) {
        res.render('login', { errors: [{ message: 'Username too short' }] , title: 'Login page', username});
        return;
    }
    if (password.length < 8) {
        res.render('login', { errors: [{ message: 'Password too short' }] , title: 'Login page', username});
        return;
    }
    if (!username.match(ENGLISH_ALFANUMERIC_PATT)) {
        res.render('login', { errors: [{ message: `Username ${username} is invalid!` }], title: 'Login page'});
        // next( {message: `Username ${username} is invalid!` });
        return;
    }
    if (!password.match(ENGLISH_ALFANUMERIC_PATT)) {
        res.render('login', { errors: [{ message: `Password ${password} is invalid!` }], title: 'Login page'});
        // next( {message: `Password ${password} is invalid!` });
        return;
    }
    authSevice.login(username, password)
        .then((token) => {
            // console.log(token);
            res.cookie(TOKEN_COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/cubes');
        })
        .catch(error => {
            
            let errors = {errors: {message: error.message}};
            res.status('404').render('login', { errors, title: 'Login Page' })
        });
});

router.get('/register', isAuthorized, (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isAuthorized, (req, res, next) => {
    const { username: user, password: pass, repeatPassword: repass } = req.body;
    let newUser = user.toLowerCase();
    if (pass.length < 8) {
        res.render('register', { errors: [{ message: 'Password too short' }] , title: 'Register page', username: user});
        return;
    }
    if (pass !== repass) {
        res.render('register', { errors: [{ message: 'Passwords missmatch'}] , title: 'Register page', username: user  });
        return;
    }
    User.findOne({ username: newUser })
        .then(userFound => {
            if (userFound) {
                res.render('register', { errors: [{ message: 'Username exists' }], title: 'Register page' });
                return;
            }
            if (!pass.match(ENGLISH_ALFANUMERIC_PATT)) {
                res.render('register', { errors: [{ message: `Password ${pass} is invalid!` }], title: 'Register page'});
                // next( {message: `Password ${pass} is invalid!` });
                return;
            }
            return authSevice.register(newUser, pass)
                .then((user) => res.redirect('/auth/login'))
                .catch(err => {
                    let errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
                    res.render('register', { errors, title: 'Register Page' })
                    // next(err);
                })
        })
        .catch(err => next(err));
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.redirect('/cubes');
});

module.exports = router;