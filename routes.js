const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');

router.use('/', homeController);
router.use('/products', productController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;