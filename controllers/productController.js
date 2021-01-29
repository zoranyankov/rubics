const { Router } = require('express');
const productService = require('../services/productServices');
const router = Router();

router.get('/', (req, res) => {
    const cubes = productService.getAll();
    console.log(cubes);
    res.render('home', {cubes});
})
router.get('/create', (req, res) => {
    res.render('create');
})
router.post('/create', (req, res) => {
    return productService.create(req.body)
    .then(data => {
        console.log(data);
        res.redirect('/products');
    })
    .catch(err => console.log('Error : ' + err));
})

module.exports = router;