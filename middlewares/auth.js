const { TOKEN_COOKIE_NAME } = require ('../config/config');

const auth = function () {
    return (req, res, next) => {
        let token = req.cookies[TOKEN_COOKIE_NAME];
        // console.log(token);
        if (!req.user) {
            
        }
        next();
    }
}

module.exports = auth;