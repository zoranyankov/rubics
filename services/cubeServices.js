const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');


function create(data) {
    return new Cube(data).save();
}

function clear() {
    return Cube.deleteMany({});
}

async function getAll(query) {
    let { search, from, to } = query;
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

function edit(_id) {
    return Cube.findById(_id).populate('accessories').lean();
}

function update(_id, data) {
    return Cube.findByIdAndUpdate(_id, data).populate('accessories').lean();
}

function removeOne(_id) {
    return Cube.findByIdAndRemove(_id);
}

async function attachAccessory(cubeId, accessoryId) {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    return cube.save()
}

module.exports = {
    create,
    getAll,
    getOne,
    clear,
    attachAccessory,
    getOnePopulated,
    edit,
    removeOne,
    update,
};