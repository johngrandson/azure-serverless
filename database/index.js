const mongoose = require('mongoose');
const DATABASE = process.env.MongodbAtlas;

module.exports = () => {
    // Connect to Atlas MongoDB
    mongoose.connect(DATABASE, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', (err) => {
        context.log(`ERROR→ ${err.message}`);
    });
}