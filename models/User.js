const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id : {
    //     type: mongoose.Types.ObjectId
    // },
    username: {
        type: String,
        minlength: 5,
        requred: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /$[a-zA-Z0-9]+^/.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        },
    },
    password: {
        type: String,
        minlength: 6,
        requred: true
    }
});

module.exports = mongoose.model('User', userSchema);