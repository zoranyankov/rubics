const { TOKEN_SECRET, TOKEN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const auth = function() {
    return (req, res, next) => {
        let token = req.cookies[TOKEN_COOKIE_NAME];
        if (token == 'undefined') {
            res.clearCookie(TOKEN_COOKIE_NAME);
            throw { message: 'invalid User or Password' }
        }
        if (token) {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            if (!decoded) {
                res.clearCookie(TOKEN_COOKIE_NAME);
            }
            req.user = decoded;
            res.locals.isAuthenticated = true;
            res.locals.loggedUser = decoded.name;
        }
        next();
    }
}

module.exports = auth;