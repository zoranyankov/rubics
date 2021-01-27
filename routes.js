const { Router } = require('express');
const router = Router();

const homeControler = require('./controllers/homeControler');
const productController = require('./controllers/productController');

router.use('/', homeControler);
router.use('/products', productController);
router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;