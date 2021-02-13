const mongoose = require('mongoose');
const { ENGLISH_ALFANUMSPACE_PATT } = require('../config/config');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
        validate: [ENGLISH_ALFANUMSPACE_PATT , 'Accessory name must be ...'],
        minlength: [5, 'Length must be atleast 5 characters'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is missing'],
        validate: {
            validator: function(v) {
                return v.match(/^https?/i);
            },
            message: props => `${props.value} is not a valid Url`,
        }
    },
    description: {
        type: String,
        required: [true, 'Description is missing'],
        maxlength: 100,
        validate: [ENGLISH_ALFANUMSPACE_PATT , 'Accessory name must be ...'],
        minlength: [20, 'Length must be atleast 20 characters'],
    },
    cubes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube',
    }
})

module.exports = mongoose.model('Accessory', accessorySchema);