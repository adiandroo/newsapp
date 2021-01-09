const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    released_on:{
        type:Date,
        required:true,
        trim:true
    }
});

module.exports = mongoose.model('News', NewsSchema);