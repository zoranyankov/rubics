const productData = require('../data/productData');
const Cube = require('../models/cube');


function create(data) {
    const newData = new Cube(data);
    return productData.create(newData);
}

function getAll(query) {
    const { search, from, to } = query;
    let products = productData.getAll();

    if (search) {
        products = products.filter(x => x.name.toLocaleLowerCase().includes(search));
    }
    if (from) {
        products = products.filter(x => x.difficultyLevel >= from);
    }
    if (to) {
        products = products.filter(x => x.difficultyLevel <= to);
    }

    return products;
}

function getOne(_id) {
    return productData.getOne(_id);
}

module.exports = {
    create,
    getAll,
    getOne
};