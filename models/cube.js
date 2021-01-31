// const uniqid = require('uniqid');
// 
// class Cube {
//     constructor({name, description, imageUrl, difficultyLevel}) {
//         this._id = uniqid();
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficultyLevel = difficultyLevel;
//     }
// }

// module.exports = Cube;

const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'need to specify Name'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    imageUrl: {
        type: String,
        // validate: /^https?/i,
        validate: {
            validator: function(v) {
                return v.match(/^https?/i);
            },
            message: props => `${props.value} is not a valid Url`,
        },
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accessory',
    }]
})

module.exports = mongoose.model('Cube', cubeSchema);