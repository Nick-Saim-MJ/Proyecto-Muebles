var express = require('express');
var router = express.Router();
var dbConn  = require('../../../lib/db');

/* GET carrito listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
    dbConn.query('SELECT Nombre, Descripcion, Stock, Precio, Foto FROM PRODUCTO ORDER BY idProducto asc', function(err, rows) {

        if (err) {
            req.flash('error', err);
            res.render('Cliente/InventarioCli/index', { data: '' });
        } else {
            // Convertir la imagen a base64 antes de renderizar la vista
            rows.forEach(function(row) {
                row.FotoBase64 = row.Foto.toString('base64');
            });

            res.render('Cliente/InventarioCli/index', { data: rows });
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