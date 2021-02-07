const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema ({
    // _id : {
    //     type: mongoose.Types.ObjectId
    // },
    username: {
        type: String,
        minlength: 4,
        requred: true
    },
    password: {
        type: String,
        minlength: 6,
        requred: true   
    }
});

module.exports = mongoose.model('User', userSchema);