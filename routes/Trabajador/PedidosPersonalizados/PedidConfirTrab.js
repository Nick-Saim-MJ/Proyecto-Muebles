var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Trabajador/PedidosPersonalizados/PedidConfirTrab/index');
});

module.exports = router;