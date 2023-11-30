var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dbConn.query('SELECT * FROM almacen ORDER BY idALMACEN desc',function(err,rows)     {
    if(err) {
      console.error(err); 
        req.flash('error', err);
        res.render('Trabajador/Inventario/OrdLlegadaTrab/index',{data:''});   
    } else {
        res.render('Trabajador/Inventario/OrdLlegadaTrab/index',{data:rows});
    }
  });
});


module.exports = router;