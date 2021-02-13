const config = {
    development: {
        PORT: process.env.PORT || 5050,
        DB_PATH: process.env.DB_PATH.trim() || 'mongodb://localhost:27017/CubesDB',
        SALT_ROUNDS: 10,
        TOKEN_SECRET: 'verySecretToken',
        TOKEN_COOKIE_NAME: 'sid',
        ENGLISH_ALFANUMERIC_PATT: /^[a-zA-Z0-9]+$/,
        ENGLISH_ALFANUMSPACE_PATT: /^[a-zA-Z0-9 ]+$/,
    },
    production: {
        PORT: process.env.PORT || 80,
        //         DB_PATH: 'mongodb+srv://<user>:<pass>@softuni.vko2t.mongodb.net/<db-name>?retryWrites=true&w=majority' || 'mongodb://localhost:27017/CubesDB'
        DB_PATH: 'write your own Mongo connection-path here!!!',
        SALT_ROUNDS: 10,
        TOKEN_SECRET: 'verySecretToken',
        TOKEN_COOKIE_NAME: 'sid',
        ENGLISH_ALFANUMERIC_PATT: /^[a-zA-Z0-9]+$/,
        ENGLISH_ALFANUMSPACE_PATT: /^[a-zA-Z0-9 ]+$/,
    }
}
module.exports = config[process.env.NODE_ENV.trim() || 'development'];
