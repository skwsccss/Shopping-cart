var productModel = require('../models/product');
var passport = require('passport');
var Cart = require('../models/cart');


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

    async addToCart(req, res, next) {
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        productModel.findById(productId, (err, product) => {
            if (err) {
                return res.redirect('/');
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
             res.redirect('/');
        });
    }

    async shoppingCart(req, res, next) {
        if (!req.session.cart) {
            return res.render('shop/shopping-cart', {products: null});
        }
        let cart = new Cart(req.session.cart);
        res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
}


module.exports = mainController;