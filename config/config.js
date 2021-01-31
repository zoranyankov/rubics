module.exports = {
    development: {
        PORT: process.env.PORT || 5050,
        DB_PATH: process.env.DB_PATH.trim() || 'mongodb://localhost:27017/CubesDB'
    },
    production: {
        PORT: process.env.PORT || 80,
//         DB_PATH: 'mongodb+srv://<user>:<pass>@softuni.vko2t.mongodb.net/<db-name>?retryWrites=true&w=majority' || 'mongodb://localhost:27017/CubesDB'
        DB_PATH: 'write your own Mongo connection-path here!!!'
    }
} 
