const { Router } = require('express');
const router = Router();
const accessoryService = require('../services/accessoryService');

router.get('/:_id/attach', (req, res) => {
    accessoryService.getAll(names)
    .then(accessories => {
        res.render('attachAccessory', {accessories});
    })
    .catch(err => console.log('Error: ' + err));
});
router.post('/:_id/attach', (req, res) => {
    console.log(req.body);
});
router.get('/create', (req, res) => {
    res.render('createAccessory');
});
router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(data => res.redirect('products'))
        .catch(err => console.log('Error: ' + err));
});


module.exports = router;