var express = require('express');
var router = express.Router();
var dbConn  = require('../../../lib/db');

/* GET carrito listing. */
router.get('/', function(req, res, next) {
    dbConn.query('SELECT id_DETALLE_VENTA,Nombre,Cantidad,TOTAL FROM detalle_venta ORDER BY id_DETALLE_VENTA asc',function(err,rows)     {
   
      if(err) {
          req.flash('error', err);
          res.render('Cliente/carrito/index',{data:''});   
      } else {
          res.render('Cliente/carrito/index',{data:rows});
      }
  });
  
  });
  
  /*VER PRODUCTO ADD*/
  router.get('/add', function (req, res, next) {
      res.render('clientes/add', {
          razonsocial: '',
          documento: '',
          direccion: '',
          celular: ''
      })
  })

module.exports = router;