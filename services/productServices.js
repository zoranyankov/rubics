// const productData = require('../data/productData');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');


function create(data) {
    return new Cube(data).save();
}

function clear(data) {
    return Cube.deleteMany({});
}

async function getAll(query) {
    let { search, from, to } = query;
    // let founded = Cube.find({}).lean();
    if (search || from || to) {
        from = from || Number.MIN_SAFE_INTEGER;
        to = to || Number.MAX_SAFE_INTEGER;
        let patt = new RegExp(search, 'i');
        let founded = Cube.find({$and: [{ name: patt}, {difficultyLevel: {$gte: from}},{difficultyLevel: {$lte: to}}],}).lean();
        return (founded);
    }
    return Cube.find({}).lean();
}

function getOne(_id) {
    return Cube.findById(_id).lean();
}

function getOnePopulated(_id) {
    return Cube.findById(_id).populate('accessories').lean();
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);

    console.log(product);
    console.log(accessory);

    product.accessories.push(accessory);
    return product.save()
}

module.exports = {
    create,
    getAll,
    getOne,
    clear,
    attachAccessory,
    getOnePopulated
};