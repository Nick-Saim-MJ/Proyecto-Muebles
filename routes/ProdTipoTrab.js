var dbConn = require('../lib/db');
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  dbConn.query('SELECT idPRODUCTO, Nombre, Descripcion, Stock, Precio FROM producto ORDER BY idPRODUCTO desc', function (err, rows) {
    if (err) {
      console.error(err);
      req.flash('error', err);
      res.render('Trabajador/Inventario/ProdTipoTrab/index', { data: '' });
    } else {
      res.render('Trabajador/Inventario/ProdTipoTrab/index', { data: rows });
    }
  });
});


/*VER PRODUCTO ADD*/
router.get('/add', function (req, res, next) {
  res.render('Trabajador/Inventario/ProdTipoTrab/add', {
    Nombre: '',
    Descripcion: '',
    Stock: '',
    Precio: '',
    Foto: '',
    INVENTARIO_DETALLE_idINVENTARIO_DETALLE: '',
    EMPLEADO_idEMPLEADO: '',
    CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO: ''
  })
})
/*Insertar en base de datos*/
router.post('/add', function (req, res, next) {

  let Nombre = req.body.Nombre;
  let Descripcion = req.body.Descripcion;
  let Stock = req.body.Stock;
  let Precio = req.body.Precio;
  let Foto = req.body.Foto;
  let CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id = req.body.CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id;
  let EMPLEADO_idEMPLEADO = req.body.EMPLEADO_idEMPLEADO;
  let CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO = req.body.CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO;

  let errors = false;

  if (Nombre.length === 0 || Descripcion.length === 0 || Stock.length === 0 || Precio.length === 0 || Foto.length === 0 || CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id.length === 0 || EMPLEADO_idEMPLEADO.length === 0 || CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO.length === 0) {
    errors = true;

    req.flash('error', "Please enter name");

    res.render('Trabajador/Inventario/ProdTipoTrab/add', {
      Nombre: Nombre,
      Descripcion: Descripcion,
      Stock: Stock,
      Precio: Precio,
      Foto: Foto,
      CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id: CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id,
      EMPLEADO_idEMPLEADO: EMPLEADO_idEMPLEADO,
      CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO: CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO
    })
  }

  // if no error
  if (!errors) {

    var form_data = {
      Nombre: Nombre,
      Descripcion: Descripcion,
      Stock: Stock,
      Precio: Precio,
      Foto: Foto,
      CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id: CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id,
      EMPLEADO_idEMPLEADO: EMPLEADO_idEMPLEADO,
      CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO: CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO
    }

    dbConn.query('INSERT INTO producto SET ?', form_data, function (err, result) {
      if (err) {
        req.flash('error', err)

        res.render('Trabajador/Inventario/ProdTipoTrab/add', {
          Nombre: form_data.Nombre,
          Descripcion: form_data.Descripcion,
          Stock: form_data.Stock,
          Precio: form_data.Precio,
          Foto: form_data.Foto,
          CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id: form_data.CATEGORINVENTARIO_DETALLE_idINVENTARIO_DETALLEIAS_id,
          EMPLEADO_idEMPLEADO: form_data.EMPLEADO_idEMPLEADO,
          CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO: form_data.CATEGORIA_PRODUCTO_idCATEGORIA_PRODUCTO
        })
      } else {
        req.flash('success', 'Producto successfully added');
        res.redirect('Trabajador/Inventario/ProdTipoTrab/index');
      }
    })
  }
})


module.exports = router;