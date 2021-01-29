const productData = require('../data/productData');
const Cube = require('../models/cube');


function create(data) {
    const newData = new Cube(data);
    return productData.create(newData);
}

function getAll() {
    return productData.getAll();
}

function getOne(_id) {
    return productData.getOne(_id);
}

module.exports = {
    create,
    getAll,
    getOne
};