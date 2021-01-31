const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

function create(data) {
    return new Accessory(data).save();
}
async function getAll(_id) {
    const currCube = await Cube.findById(_id);
    let addedAccessories = currCube.accessories;
    return Accessory.find({_id: {$nin: addedAccessories}}).lean();
}

module.exports = {
    create,
    getAll,
}