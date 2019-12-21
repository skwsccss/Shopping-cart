var mongoose = require('mongoose');

var test = mongoose.Schema({
    field1: {
        type: String,
    },
    field2: {
        type: String,
    },
    field3: {
        type: String,
    },
    field4: {
        type: String,
    },
}
)
module.exports = mongoose.model('test', test);