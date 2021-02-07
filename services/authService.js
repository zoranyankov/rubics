const User = require('../models/User');
const bcrypt = require('bcrypt');
const { saltRound } = require('../config/config');

function login(user, pass) {

}

function register(username, password) {
    return bcrypt.genSalt(saltRound)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => new User({username, password: hash}).save())
}

function logout(user, pass) {

}

module.exports = {
    login,
    register,
    logout
}