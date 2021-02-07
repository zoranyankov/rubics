const express = require('express');

const app = express();
const routes = require('./routes');
const config = require('./config/config');

require('./config/express')(app);
require('./config/mongoose.js')();

app.use(routes);

app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));