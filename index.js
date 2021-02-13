const express = require('express');

const app = express();
const routes = require('./routes');
const config = require('./config/config');

const errorHandler = require('./middlewares/errorHandler');

require('./config/express')(app);
require('./config/mongoose.js')();

app.use(routes);
app.use(errorHandler());

app.listen(config.PORT, () => console.log(`Server is listening on port:${config.PORT}...`));