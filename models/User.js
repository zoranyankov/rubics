const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema ({
    // _id : {
    //     type: mongoose.Types.ObjectId
    // },
    username: {
        type: String,
        requred: true
    },
    password: {
        type: String,
        requred: true   
    }
});

module.exports = mongoose.model('User', userSchema);