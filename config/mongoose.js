function mongooseConfig() {
    const mongoose = require('mongoose');

    const cubesDB = 'mongodb://localhost:27017/CubesDB';

    mongoose.connect(cubesDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error: '));
    db.once('open', console.log.bind(console, 'CubesDB connected...'))
    // db.on('error', (err) => console.log('Error: ' + err));
    // db.once('open', () => console.log('CubesDB connected...'))
}

module.exports = mongooseConfig;