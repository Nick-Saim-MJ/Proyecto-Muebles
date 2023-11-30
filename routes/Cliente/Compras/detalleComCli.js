var dbConn  = require('../../../lib/db');
var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM detalle_venta ORDER BY id_DETALLE_VENTA asc',function(err,rows)     {
   
      if(err) {
          req.flash('error', err);
          res.render('Cliente/ComprasCli/detalleComCli/index',{data:''});   
      } else {
          res.render('Cliente/ComprasCli/detalleComCli/index',{data:rows});
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