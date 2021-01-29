const productData = require('../data/productData');
const Cube = require('../models/cube');


function create(data) {
    return new Cube({...data }).save();
}

function getAll(query) {
    return Cube.find({}).lean();
    // const { search, from, to } = query;
    // let products = productData.getAll();

    // if (search) {
    //     products = products.filter(x => x.name.toLocaleLowerCase().includes(search));
    // }
    // if (from) {
    //     products = products.filter(x => x.difficultyLevel >= from);
    // }
    // if (to) {
    //     products = products.filter(x => x.difficultyLevel <= to);
    // }

    // return products;
}

function getOne(_id) {
    return Cube.findById(_id).lean();
}

module.exports = {
    create,
    getAll,
    getOne
};