const router = require('express').Router();
const authSevice = require('../services/authService')

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login Page'});
});

// router.post('/login', (req, res) => {
//     authSevice.login(username, password)
//     .then ((res) => console.log(res))
//     .catch(err => {
//         res.status('404').render('login', {title: 'Login Page'})
//     })
//     res.render('login', {title: 'Login Page'});
// });

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register Page'});
});

router.post('/register', (req, res) => {
    const {username : user, password: pass, repeatPassword: repass} = req.body;
    if (pass !== repass) {
        res.render('register', {error: {message: 'Passwords missmatch'}});
        return;
    }
    authSevice.register(user, pass)
        .then(() => res.redirect('/auth/login'))
        .catch(error => res.render('register', {error, title: 'Register Page'}))
});

router.get('/logout', (req, res) => {
    res.redirect('/cubes');
});

module.exports = router;