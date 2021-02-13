const mongoose = require('mongoose');
const { ENGLISH_ALFANUMERIC_PATT } = require('../config/config');


const userSchema = new mongoose.Schema({
    // _id : {
    //     type: mongoose.Types.ObjectId
    // },
    username: {
        type: String,
        minlength: [5, 'Username is to short'],
        requred: true,
        // validate: [ENGLISH_ALFANUMERIC_PATT,props => `${props.value} is not a valid username!`]
        // unique: true,
        validate: {
            validator: function (v) {
                return ENGLISH_ALFANUMERIC_PATT.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        },
    },
    password: {
        type: String,
        minlength: [8, 'Password is to short'],
        requred: true,
        // unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[a-zA-Z0-9]+$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid username!`
        // },
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    next();    
})


module.exports = mongoose.model('User', userSchema);