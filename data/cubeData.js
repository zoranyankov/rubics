const fs = require('fs/promises');
const path = require('path');
const pathToCubes = path.normalize(__dirname + '/cubes.json');
const cubesData = require('./cubes.json');

function create(newOne) {

    // cubesData.push(newOne)
    // return fs.writeFile(pathToCubes, JSON.stringify(cubesData));
}

function getAll() {
    return cubesData;
}

function getOne(_id) {
    return cubesData.find(x => x._id == _id);
}

module.exports = {
    create,
    getAll,
    getOne
};