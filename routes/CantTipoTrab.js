var dbConn  = require('../lib/db');
var express=require('express');
var router=express.Router();


/* GET users listing. */


//LISTAR CATEGORIA_PRODUCTO
router.get('/', function(req, res, next) {
  dbConn.query('SELECT * FROM categoria_producto ORDER BY idCATEGORIA_PRODUCTO desc',function(err,rows)     {
    if(err) {
      console.error(err); 
        req.flash('error', err);
        res.render('Trabajador/Inventario/CantTipoTrab/index',{data:''});   
    } else {
        res.render('Trabajador/Inventario/CantTipoTrab/index',{data:rows});
    }
  });
});

/*VER PRODUCTO ADD*/
router.get('/add', function (req, res, next) {
  res.render('Trabajador/Inventario/CantTipoTrab/add', {
    Nombre: '',
    Descripcion: ''
  
  })
})
/*Insertar en base de datos*/
router.post('/add', function (req, res, next) {

  let Nombre = req.body.Nombre;
  let Descripcion = req.body.Descripcion;
  

  let errors = false;

  if (Nombre.length === 0 || Descripcion.length === 0) {
    errors = true;

    req.flash('error', "Please enter name");

    res.render('Trabajador/Inventario/CantTipoTrab/add', {
      Nombre: Nombre,
      Descripcion: Descripcion
    })
  }

  // if no error
  if (!errors) {

    var form_data = {
      Nombre: Nombre,
      Descripcion: Descripcion
    }

    dbConn.query('INSERT INTO categoria_producto SET ?', form_data, function (err, result) {
      if (err) {
        req.flash('error', err)

        res.render('Trabajador/Inventario/CantTipoTrab/add', {
          Nombre: form_data.Nombre,
          Descripcion: form_data.Descripcion
         
        })
      } else {
        req.flash('success', 'Producto successfully added');
        res.redirect('/CantTipoTrab');
      }
    })
  }
})


/*Ver Formulario Editar*/
router.get('/edit/(:idCATEGORIA_PRODUCTO)', function(req, res, next) {

  let idCATEGORIA_PRODUCTO = req.params.idCATEGORIA_PRODUCTO;
 
  dbConn.query('SELECT * FROM categoria_producto WHERE idCATEGORIA_PRODUCTO = ' + idCATEGORIA_PRODUCTO, function(err, rows, fields) {
      if(err) throw err
       
      if (rows.length <= 0) {
          req.flash('error', 'Registro not found with id = ' + id)
          res.redirect('/CantTipoTrab')
      }
      // if book found
      else {
          // render to edit.ejs
          res.render('Trabajador/Inventario/CantTipoTrab/edit', {
            idCATEGORIA_PRODUCTO: rows[0].idCATEGORIA_PRODUCTO,
              Nombre: rows[0].Nombre, 
              Descripcion: rows[0].Descripcion 
          })
      }
  })
})

/*Actualizar Formulario a Base de Datos*/

router.post('/update/:idCATEGORIA_PRODUCTO', function(req, res, next) {

  let idCATEGORIA_PRODUCTO = req.params.idCATEGORIA_PRODUCTO;
  let Nombre = req.body.Nombre;
  let Descripcion = req.body.Descripcion;
  let errors = false;

  if(Nombre.length === 0 || Descripcion .length === 0) {
      errors = true;
      
      // set flash message
      req.flash('error', "Please enter name ");
      // render to add.ejs with flash message
      res.render('Trabajador/Inventario/CantTipoTrab/edit', {
        idCATEGORIA_PRODUCTO: req.params.idCATEGORIA_PRODUCTO,
          Nombre: Nombre,
          Descripcion: Descripcion
      })
  }

  // if no error
  if( !errors ) {   

      var form_data = {
          Nombre: Nombre,
          Descripcion: Descripcion
      }
      dbConn.query('UPDATE categoria_producto SET ? WHERE idCATEGORIA_PRODUCTO = ' + idCATEGORIA_PRODUCTO, form_data, function(err, result) {
          if (err) {
              req.flash('error', err)
              res.render('Trabajador/Inventario/CantTipoTrab/edit', {
                idCATEGORIA_PRODUCTO: req.params.idCATEGORIA_PRODUCTO,
                Nombre: form_data.Nombre,
                Descripcion: form_data.Descripcion
              })
          } else {
              req.flash('success', 'Registro successfully updated');
              res.redirect('/CantTipoTrab');
          }
      })
  }
})

/*Eliminar Registro de Base de Datos*/
router.get('/delete/(:idCATEGORIA_PRODUCTO)', function(req, res, next) {

  let idCATEGORIA_PRODUCTO = req.params.idCATEGORIA_PRODUCTO;
   
  dbConn.query('DELETE FROM categoria_producto WHERE idCATEGORIA_PRODUCTO = ' + idCATEGORIA_PRODUCTO, function(err, result) {
      if (err) {
          req.flash('error', err)
          res.redirect('/CantTipoTrab')
      } else {
          req.flash('success', 'Registro successfully deleted! idCATEGORIA_PRODUCTO = ' + idCATEGORIA_PRODUCTO)
          res.redirect('/CantTipoTrab')
      }
  })
})



module.exports = router;