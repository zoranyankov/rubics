const fs = require('fs/promises');
const path = require('path');
const pathToCubes = path.normalize(__dirname + '/cubes.json');
const cubesData = require('../data/cubes.json');

function add(newOne) {
    cubesData.push(newOne)
    return fs.writeFile(pathToCubes, JSON.stringify(cubesData));
}

function getAll() {
    return cubesData;
}

module.exports = {
    add,
    getAll
};