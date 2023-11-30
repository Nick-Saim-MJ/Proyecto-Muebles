var dbConn  = require('../lib/db');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  dbConn.query('SELECT * FROM pedido_personalizado ORDER BY idPEDIDO_PERSONALIZADO desc',function(err,rows)     {
    if(err) {
      console.error(err); 
        req.flash('error', err);
        res.render('Trabajador/PedidosPersonalizados/ListPedidTrab/index',{data:''});   
    } else {
        res.render('Trabajador/PedidosPersonalizados/ListPedidTrab/index',{data:rows});
    }
  });
});

module.exports = router;