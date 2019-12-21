var productModel = require('../models/product')

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
}


module.exports = mainController;