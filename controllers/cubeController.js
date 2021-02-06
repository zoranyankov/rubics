const { Router } = require('express');
const cubeService = require('../services/cubeServices');
const { selectActiveDifficulty, clearSelected } = require('./helpers/selectActiveOption');
const router = Router();

router.get('/', (req, res) => {
    cubeService.getAll(req.query)
        .then(cubes => {
            const content = req.query.search ? { cubes, 'inSearch': true } : { cubes };
            res.render('home', {...content, title: 'Cubicle'});
        })
        .catch(err => console.log('Error: ' + err));
});
router.get('/create', (req, res) => {
    const options = clearSelected();   //TODO: Must find better way
    res.render('createCube', { options, title: 'Create Cube Page' });
});
router.post('/create', (req, res) => {
    cubeService.create({ ...req.body })
        .then(data => {
            // console.log(data);
            res.redirect('/cubes');
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/details/:_id', (req, res) => {
    cubeService.getOnePopulated(req.params._id)
        .then((currentCube) => {
            currentCube.accessories.forEach(x => x.prod_id = req.params._id)
            res.render('details', { ...currentCube, title: 'Cubicle' });
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/edit/:_id', (req, res) => {
    cubeService.getOnePopulated(req.params._id)
        .then((data) => {
            const options = selectActiveDifficulty(data.difficultyLevel); //TODO: is there a better way?
            res.render('editCube', { ...data, options, title: 'Edit Cube Page' })
        })
        .catch(err => console.log('Error : ' + err));
});
router.post('/edit/:_id', (req, res) => {
    cubeService.update(req.params._id, { ...req.body })
        .then(data => {
            // console.log(data);
            res.redirect(`/cubes/details/${data._id}`);
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/delete/:_id', (req, res) => {
    cubeService.getOnePopulated(req.params._id)
        .then((data) => {
            const options = selectActiveDifficulty(data.difficultyLevel); //TODO: is there a better way?
            res.render('deleteCube', { ...data, options, title: 'Delete Cube Page' })
        })
        .catch(err => console.log('Error : ' + err));
});
router.post('/delete/:_id', (req, res) => {
    cubeService.removeOne(req.params._id)
        .then((data) => res.redirect('/cubes'))
        .catch(err => console.log('Error : ' + err));
});
router.get('/clearDB', (req, res) => {
    cubeService.clear()
        .then((data) => res.redirect('/cubes'))
        .catch(err => console.log('Error : ' + err));
});


module.exports = router;