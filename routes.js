const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');

const auth = require('./middlewares/auth');

router.use(auth());

router.use('/', homeController);
router.use('/auth', authController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404', {title: 'Page Not Found'});
})

module.exports = router;