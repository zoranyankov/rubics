const env = process.env.NODE_ENV.trim() || 'development';
const app = require('express')();
const config = require('./config/config')[env];

app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));