const { Router } = require('express');
const cubeService = require('../services/cubeServices');
const { selectActiveDifficulty, clearSelected } = require('./helpers/selectActiveOption');
const { isLogged, isCreator, isSuperUser } = require('../middlewares/guards');

const router = Router();

router.get('/', (req, res) => {
    const _id = req.user ? req.user._id : null;
    // console.log(_id);
    cubeService.getAll(req.query)
        .then(cubes => {
            cubes.forEach(c => c.isCreator = c.creatorId == _id);
            const content = req.query.search ? { cubes, 'inSearch': true } : { cubes };
            res.render('home', {...content, title: 'Cubicle'});
        })
        .catch(err => console.log('Error: ' + err));
});
router.get('/create', isLogged, (req, res) => {
    const options = clearSelected();   //TODO: Must find better way
    res.render('createCube', { options, title: 'Create Cube Page' });
});
router.post('/create', isLogged, (req, res) => {
    cubeService.create({ ...req.body, creatorId: req.user._id})
        .then(data => {
            // console.log(data);
            res.redirect('/cubes');
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/details/:prod_id', (req, res) => {
    const _id = req.user ? req.user._id : null;
    cubeService.getOnePopulated(req.params.prod_id)
        .then((currentCube) => {
            currentCube.isCreator = currentCube.creatorId == _id;
            currentCube.accessories.forEach(x => x.prod_id = req.params.prod_id)
            res.render('details', { ...currentCube, title: 'Cubicle' });
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/edit/:prod_id', isLogged, isCreator, (req, res) => {
    cubeService.getOnePopulated(req.params.prod_id)
        .then((data) => {
            const options = selectActiveDifficulty(data.difficultyLevel); //TODO: is there a better way?
            res.render('editCube', { ...data, options, title: 'Edit Cube Page' })
        })
        .catch(err => console.log('Error : ' + err));
});
router.post('/edit/:prod_id', isLogged, isCreator, (req, res) => {
    cubeService.update(req.params.prod_id, { ...req.body })
        .then(data => {
            // console.log(data);
            res.redirect(`/cubes/details/${data._id}`);
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/delete/:prod_id', isLogged, isCreator, (req, res) => {
    cubeService.getOnePopulated(req.params.prod_id)
        .then((data) => {
            const options = selectActiveDifficulty(data.difficultyLevel); //TODO: is there a better way?
            res.render('deleteCube', { ...data, options, title: 'Delete Cube Page' })
        })
        .catch(err => console.log('Error : ' + err));
});
router.post('/delete/:prod_id', isLogged, isCreator, (req, res) => {
    cubeService.removeOne(req.params.prod_id)
        .then((data) => res.redirect('/cubes'))
        .catch(err => console.log('Error : ' + err));
});
router.get('/clearDB', isSuperUser, (req, res) => {
    cubeService.clear()
        .then((data) => res.redirect('/cubes'))
        .catch(err => console.log('Error : ' + err));
});


module.exports = router;