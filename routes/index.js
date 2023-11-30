var dbConn  = require('../lib/db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('opcSesion', { title: 'Express' });
});

/* GET opcSesion */
router.get('/opcSesion', function(req, res, next) {
  res.render('index');
});

/* GET SesionTrab */
router.get('/SesionTrab', function(req, res, next) {
  res.render('SesionTrab');
});

/* POST SesionTrab*/ 

router.post('/indexTrab', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;
  dbConn.query("SELECT * FROM usuarios WHERE email='"+email+"' AND password='"+password+"' ",function(err,rows){
    console.log(rows);
    if(err){
      req.flash('error',err);
      console.log(err);
    }else{
      if(rows.length){
        req.session.idu=rows[0]["id"];
        req.session.email=rows[0]["email"];
        req.session.loggedin=true;
        res.redirect('indexTrab');
      }else{
        req.flash('error','El usuario no existe...');
        res.redirect('/')
      }
    }
  });
});
/* GET SesionTrab */

router.get('/indexTrab', function(req, res, next) {
  if(!req.session.loggedin){
    res.redirect('/');
  }else {
        res.render('indexTrab');
      }
    ;
});


/* GET SesionCli */
router.get('/SesionCli', function(req, res, next) {
  res.render('SesionCli');
});

/* POST SesionCli*/ 

router.post('/opcSesion', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;
  dbConn.query("SELECT * FROM usuarios WHERE email='"+email+"' AND password='"+password+"' ",function(err,rows){
    console.log(rows);
    if(err){
      req.flash('error',err);
      console.log(err);
    }else{
      if(rows.length){
        req.session.idu=rows[0]["id"];
        req.session.email=rows[0]["email"];
        req.session.loggedinopcSesion=true;
        res.redirect('opcSesion');
      }else{
        req.flash('error','El usuario no existe...');
        res.redirect('/')
      }
    }
  });
});
/* GET SesionCli */

router.get('/opcSesion', function(req, res, next) {
  if(!req.session.loggedin){
    res.redirect('/');
  }else {
        res.render('opcSesion');
      }
    ;
});

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect("/");
});

/*VER Registro ADD*/
router.get('/registroCliente', function (req, res, next) {
  res.render('registroCliente', {
      email: '',
      password: '',
      Nombres: '',
      Apellidos: '',
      Telefono:''
  })
})
/*Insertar en base de datos*/
router.post('registroCliente', function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;
  let Nombres = req.body.Nombres;
  let Apellidos = req.body.Apellidos;
  let Telefono = req.body.Telefono;
  let errors = false;

  if (email.length === 0 || password.length === 0 || Nombres.length === 0 || Apellidos.length === 0 || Telefono.length === 0) {
      errors = true;

      req.flash('error', "Por favor complete todos los campos");

      res.render('clientes/add', {
        email: email,
        password: password,
        Nombres: Nombres,
        Apellidos: Apellidos,
        Telefono: Telefono
      })
  }

  // if no error
  if (!errors) {

      var form_data = {
        email: email,
        password: password,
        Nombres: Nombres,
        Apellidos: celular
      }

      dbConn.query('INSERT INTO clientes SET ?', form_data, function (err, result) {
          if (err) {
              req.flash('error', err)

              res.render('clientes/add', {
                  razonsocial: form_data.razonsocial,
                  documento: form_data.documento,
                  direccion: form_data.direccion,
                  celular: form_data.celular
              })
          } else {
              req.flash('success', 'Cliente successfully added');
              res.redirect('/clientes');
          }
      })
  }
})


/* GET trabajador i */
router.get('/indexTrab', function(req, res, next) {
  res.render('indexTrab');
});

/* GET opcTrabajador i */
router.get('/opcTrabajador', function(req, res, next) {
  res.render('opcTrabajador');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Trabajador/CantTipoTrab/index');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Trabajador/OrdLlegadaTrab/index');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Trabajador/ListPedidTrab/index');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Trabajador/ProdTipoTrab/index');
});


module.exports = router;
