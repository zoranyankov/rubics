const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const { isLogged }  = require('./middlewares/guards');

const auth = require('./middlewares/auth');

router.use(auth());

router.use('/', homeController);
router.use('/auth', authController);
router.use('/cubes', cubeController);
router.use('/accessories', isLogged, accessoryController);
router.get('*', (req, res, next) => {
    
    // res.render('404', {title: 'Page Not Found'});
    next({});
})

module.exports = router;