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
function removeOne(_id) {
    return Accessory.findByIdAndDelete(_id);
}
function clear() {
    return Accessory.deleteMany({});
}

module.exports = {
    create,
    getAll,
    clear,
    removeOne,
}