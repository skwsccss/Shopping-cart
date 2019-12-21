var testModel = require('../models/test.model')

class mainController {
    async index(req, res) {
        res.render('shop/index', { title: 'Express' });
    }
}


module.exports = mainController;