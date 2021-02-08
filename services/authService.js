const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, TOKEN_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

async function login(user, pass) {
    user = user.toLowerCase(); // first option
    // user = new RegExp(user, 'ig'); // second option
    return User.findOne({ username: user })
        .then((userFound) => {
            if (!userFound) throw { message: 'Wrong User or Password!' };
            return bcrypt.compare(pass, userFound.password)
                .then((isIdentical) => {
                    if (!isIdentical) {
                        throw new Error('Wrong User ot PASSword!');
                    }
                    let superUser = userFound.username == 'zoroboy' ? true : false;
                    return token = jwt.sign({ _id: userFound._id, name: userFound.username, superUser }, TOKEN_SECRET)
                })
                // .catch(error => res.status(404).render('404', error));
                // .catch(err => console.log('Error: ' + err));

        })
        // .catch(error => res.status(404).render('404', error));
        // .catch(err => console.log('Error: ' + err));

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