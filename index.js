const express = require('express');
const env = process.env.NODE_ENV.trim() || 'development';

const app = express();
const routes = require('./routes');
const config = require('./config/config')[env];

require('./config/express')(app);

app.use(routes);

app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));
