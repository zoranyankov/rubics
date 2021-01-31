const { Router } = require('express');
const productService = require('../services/productServices');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(cubes => {
            const content = req.query.search ? { cubes, 'inSearch': true } : { cubes };
            res.render('home', content);
        })
        .catch(err => console.log('Error: ' + err));
})
router.get('/create', (req, res) => {
    res.render('createCube');
})
router.post('/create', (req, res) => {
    // productService.create({...req.body, _id: uniqid() })
    productService.create({...req.body})
        .then(data => {
            // console.log(data);
            res.redirect('/products');
        })
        .catch(err => console.log('Error : ' + err));
})
router.get('/details/:_id', (req, res) => {
    productService.getOne(req.params._id)
        .then((currentCube) => {
            res.render('details', {...currentCube });
        })
        .catch(err => console.log('Error : ' + err));
})
router.get('/clearDB', (req, res) => {
    productService.clear()
        .then((data) => {
            res.redirect('/products');
        })
        .catch(err => console.log('Error : ' + err));
})


module.exports = router;