const { TOKEN_SECRET, TOKEN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const auth = function () {
    return (req, res, next) => {
        let token = req.cookies[TOKEN_COOKIE_NAME];
        // console.log(token);
        if (token) {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            if (!decoded) {
                res.clearCookie(TOKEN_COOKIE_NAME);
            }
            req.user = decoded;
            res.locals.isAuthenticated = true;
        }
        next();
    }
}

module.exports = auth;