const { Router } = require('express');
const cubeService = require('../services/cubeServices');

const router = Router();

router.get('/', (req, res) => {
    cubeService.getAll(req.query)
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
    cubeService.create({...req.body})
        .then(data => {
            // console.log(data);
            res.redirect('/cubes');
        })
        .catch(err => console.log('Error : ' + err));
})
router.get('/details/:_id', (req, res) => {
    cubeService.getOnePopulated(req.params._id)
        .then((currentCube) => res.render('details', {...currentCube }))
        .catch(err => console.log('Error : ' + err));
})
router.get('/clearDB', (req, res) => {
    cubeService.clear()
        .then((data) => res.redirect('/cubes'))
        .catch(err => console.log('Error : ' + err));
})


module.exports = router;