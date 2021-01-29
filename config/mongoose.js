function mongooseConfig() {
    const mongoose = require('mongoose');

    const cubesDB = 'mongodb://localhost:27017/CubesDB';

    mongoose.connect(cubesDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (err) => console.log('Error: ' + err));
    db.on('open', () => console.log('CubesDB connected...'))
}

module.exports = mongooseConfig;