const Accessory = require('../models/Accessory');

function create(data) {
    return new Accessory(data).save();
}

module.exports = {
    create,
}