const { Router } = require('express');
const router = Router();
const accessoryService = require('../services/accessoryService');
const productServices = require('../services/productServices');

router.get('/:_id/attach', (req, res) => {
    const _id = req.params._id;
    accessoryService.getAll(_id)
        .then(accessories => {
            res.render('attachAccessory', { accessories, _id });
        })
        .catch(err => console.log('Error: ' + err));
});
router.post('/:_id/attach', (req, res) => {
    const productId = req.params._id;
    const accessoryId = req.body.accessory;
    productServices.attachAccessory(productId, accessoryId)
        .then(() => res.redirect(`/products/details/${productId}`))
        .catch(err => console.log('Error: ' + err));
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