var productModel = require('../models/product');
var passport = require('passport')


class mainController {
    async index(req, res) {
        let products = await productModel.find({})
        let productChunks = [];
        let chunkSize = 3;
        for (let i = 0; i < products.length; i += chunkSize) {
            productChunks.push(products.slice(i, i + chunkSize));
        }
        res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
    }
    async signup(req, res, next) {
        let messages = req.flash('error')
        if (req.method === 'GET') {
            res.render('auth/signup', { title: 'Sign Up', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
        } else if (req.method === 'POST') {
            res.redirect('/');
        }
    }

    async signin(req, res, next) {
        let messages = req.flash('error');
        if (req.method === 'GET') {
            res.render('auth/signin', { title: 'Sign In', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
        } 
    }
}


module.exports = mainController;