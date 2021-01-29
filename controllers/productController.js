const { Router } = require('express');
const Cube = require('../models/cube');
const product = require('../data/product');
const router = Router();

router.get('/', (req, res) => {
    const cubes = product.getAll();
    res.render('home', {cubes});
})
router.get('/create', (req, res) => {
    res.render('create');
})
router.post('/create', (req, res) => {
    const newData = new Cube(req.body);
    console.log(newData);
    product.add(newData)
        .then(data => {console.log(data); res.redirect('/products')})
        .catch(err => console.log('Error: ' + err));
})

module.exports = router;