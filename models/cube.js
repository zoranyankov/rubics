const uniqid = require('uniqid');

class Cube {
    constructor(name, description, imageUrl, dificultyLevel) {
        uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.dificultyLevel = dificultyLevel;
    }
}

module.exports = Cube;