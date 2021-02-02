const { Router } = require('express');
const router = Router();
const accessoryService = require('../services/accessoryService');
const cubeServices = require('../services/cubeServices');

router.get('/:_id/attach', async(req, res) => {
    const _id = req.params._id;
    const currCube = await cubeServices.getOne(_id);
    accessoryService.getAll(_id)
        .then(accessories => {
            res.render('attachAccessory', {...currCube, accessories, _id });
        })
        .catch(err => console.log('Error: ' + err));
});
router.post('/:prod_id/attach', (req, res) => {
    const cubeId = req.params.prod_id;
    const accessoryId = req.body.accessory;
    cubeServices.attachAccessory(cubeId, accessoryId)
        .then(() => res.redirect(`/cubes/details/${cubeId}`))
        .catch(err => console.log('Error: ' + err));
});
router.get('/:prod_id/remove/:_id', (req, res) => {
    const cubeId = req.params.prod_id;
    const accessoryId = req.params._id;
    cubeServices.detachAccessory(cubeId, accessoryId)
        .then(() => res.redirect(`/cubes/details/${cubeId}`))
        .catch(err => console.log('Error: ' + err));
});
router.get('/create', (req, res) => {
    res.render('createAccessory');
});
router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(data => res.redirect('/cubes'))
        .catch(err => console.log('Error: ' + err));
});
router.get('/clearDB', (req, res) => {
    accessoryService.clear()
        .then((data) => res.redirect('/cubes'))
        .catch(err => console.log('Error : ' + err));
})


module.exports = router;