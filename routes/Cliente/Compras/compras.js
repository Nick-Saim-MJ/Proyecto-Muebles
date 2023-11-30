var express = require('express');
var router = express.Router();
var dbConn  = require('../../../lib/db');

/* GET carrito listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM CLIENTE ORDER BY idCLIENTE asc',function(err,rows)     {
   
      if(err) {
          req.flash('error', err);
          res.render('Cliente/ComprasCli/compras/index',{data:''});   
      } else {
          res.render('Cliente/ComprasCli/compras/index',{data:rows});
      }
  });
  
  });
/*VER PRODUCTO ADD*/
router.get('/compras/index', function (req, res, next) {
    res.render('clientes/add', {
        razonsocial: '',
        documento: '',
        direccion: '',
        celular: ''
    })
})
  /*Insertar en base de datos*/
  router.post('/compras/index', function (req, res, next) {

    let Nombre = req.body.Nombre;
    let Apellido_pat = req.body.Apellido_pat;
    let Apellido_mat = req.body.Apellido_mat;
    let DNI = req.body.DNI;
    let Direccion = req.body.Direccion;
    let Telefono = req.body.Telefono;
    let Correo = req.body.Correo;

    let errors = false;

    if (Nombre.length === 0 || Apellido_pat.length === 0 || Apellido_mat.length === 0 || DNI.length === 0 || Direccion.length === 0 || Telefono.length === 0 || Correo.length === 0) {
        errors = true;

        req.flash('error', "Por favor complete el formulario");

        res.render('ComprasCli/compras/index', {
            Nombre: Nombre,
            Apellido_pat: Apellido_pat,
            Apellido_mat: Apellido_mat,
            DNI: DNI,
            Direccion: Direccion,
            Telefono: Telefono,
            Correo: Correo
        });
    }

    // if no error
    if (!errors) {
        var form_data = {
            Nombre: Nombre,
            Apellido_pat: Apellido_pat,
            Apellido_mat: Apellido_mat,
            DNI: DNI,
            Direccion: Direccion,
            Telefono: Telefono,
            Correo: Correo
        };

        dbConn.query('INSERT INTO CLIENTE SET ?', form_data, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('/ComprasCli/compras/index', {
                    Nombre: form_data.Nombre,
                    Apellido_pat: form_data.Apellido_pat,
                    Apellido_mat: form_data.Apellido_mat,
                    DNI: form_data.DNI,
                    Direccion: form_data.Direccion,
                    Telefono: form_data.Telefono,
                    Correo: form_data.Correo
                });
            } else {
                req.flash('success', 'Cliente añadido exitosamente');
                res.redirect('/Cliente/Pagos/pagoCli/index');
            }
        });
    }
});
module.exports = router;
