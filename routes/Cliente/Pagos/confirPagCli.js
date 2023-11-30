var express = require('express');
var router = express.Router();

/* GET carrito listing. */
router.get('/', function (req, res, next) {
    res.render('Cliente/Pagos/confirPagCli/index');
});

module.exports = router;