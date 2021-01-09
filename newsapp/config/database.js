//setup connection to mongodb

const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/News_App';

mongoose
    .connect(
        mongoDB,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'));

mongoose.Promise = global.Promise;

module.exports = mongoose;