const Accessory = require('../models/Accessory');

function create(data) {
    return new Accessory(data).save();
}
function getAll(fields) {
    return Accessory.find({}).select(fields).lean();
}

module.exports = {
    create,
    getAll,
}