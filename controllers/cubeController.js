const { Router } = require('express');
const cubeService = require('../services/cubeServices');
const optionsDB = require('../data/options.json');

const router = Router();

router.get('/', (req, res) => {
    cubeService.getAll(req.query)
        .then(cubes => {
            const content = req.query.search ? { cubes, 'inSearch': true } : { cubes };
            res.render('home', content);
        })
        .catch(err => console.log('Error: ' + err));
});
router.get('/create', (req, res) => {
    const options = optionsDB.map(row => { //TODO: Must find better way
        if (row.isSelected) {
            delete row.isSelected;
        }
        return row;
    });
    res.render('createCube', { options, type: 'Create' });
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
            res.render('details', { ...currentCube });
        })
        .catch(err => console.log('Error : ' + err));
});
router.get('/edit/:_id', (req, res) => {
    cubeService.getOnePopulated(req.params._id)
        .then((data) => {
            const options = optionsDB.map(row => {   //TODO: is there a better way?
                if (row.opId == data.difficultyLevel) {
                    row.isSelected = 'selected=true';
                }
                return row;
            });
            res.render('createCube', { ...data, options, type: 'Edit' })
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