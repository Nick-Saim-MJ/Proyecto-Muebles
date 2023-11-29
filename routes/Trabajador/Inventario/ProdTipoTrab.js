var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Trabajador/Inventario/ProdTipoTrab/index');
});

module.exports = router;