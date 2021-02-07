const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, TOKEN_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

async function login(user, pass) {
    return User.findOne({ username: user })
        .then((userFound) => {
            if (!userFound) throw { message: 'Wrong User or Password!' };
            return bcrypt.compare(pass, userFound.password)
                .then((isIdentical) => {
                    if (!isIdentical) {
                        throw new Error('Wrong User ot PASSword!');
                    }
                    return token = jwt.sign({ _id: userFound._id, }, TOKEN_SECRET)
                })
        })
}

async function register(username, password) {
    return bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => new User({ username, password: hash }).save())
}

module.exports = {
    login,
    register,
}