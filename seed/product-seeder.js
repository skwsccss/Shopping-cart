var Product = require('../models/product');
var mongoose = require('mongoose');
require('dotenv').config();


const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/test';
mongoose.connect(MONGOURL, { useNewUrlParser: true }, err => {
    console.error(err || `Connected to MongoDB: ${MONGOURL}`);
});
var products = [
    new Product({
        imgPath: 'receiver.jpg',
        title: 'Receiver',
        description: 'Awesome receiver',
        price: 5
    }),
    new Product({
        imgPath: 'tv.jpg',
        title: 'TV',
        description: 'Awesome TV',
        price: 5
    }),
    new Product({
        imgPath: 'speaker.jpg',
        title: 'Speaker',
        description: 'Awesome Speaker',
        price: 5
    }),
    new Product({
        imgPath: 'tool.jpg',
        title: 'Tools',
        description: 'The best Tools',
        price: 5
    }),
];
let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save((err, res) => {
        done++;
        if (done === products.length) {
            mongoose.disconnect();
        }
    });
}


