const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.match(/^https?/i);
            },
            message: props => `${props.value} is not a valid Url`,
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    cubes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube',
    }
})

module.exports = mongoose.model('Accessory', accessorySchema);