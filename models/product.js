var mongoose = require('mongoose');

var product = mongoose.Schema({
    imgPath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
}
)
module.exports = mongoose.model('product', product);