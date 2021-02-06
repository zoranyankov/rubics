const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema ({
    _id : {
        type: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        requred: true
    },
    password: {
        type: String,
        requred: true
    },
    creatorId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);