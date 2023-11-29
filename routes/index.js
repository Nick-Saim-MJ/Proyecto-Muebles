
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

router.post('/opcTrabajador', function(req, res, next) {
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
        res.redirect('/opcTrabajador');
      }else{
        req.flash('error','El usuario no existe...');
        res.redirect('opcSesion')
      }
    }
  });
});
/* GET SesionTrab */

router.get('/opcTrabajador', function(req, res, next) {
  if(!req.session.loggedin){
    res.redirect('/Sesiontrab');
  }else {
        res.render('opcTrabajador');
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


/* GET RegistroCliente i */
router.get('/RegistroCliente', function(req, res, next) {
  res.render('RegistroCliente');
});

/* GET trabajador i */
router.get('/indexTrab', function(req, res, next) {
  res.render('indexTrab');
});

/* GET opcTrabajador i */
router.get('/opcTrabajador', function(req, res, next) {
  res.render('opcTrabajador');
});

/* GET inventarioCli */
router.get('/inventarioCli', function(req, res, next) {
  res.render('inventarioCli');
});

/* GET detalleComCli */
router.get('/detalleComCli', function(req, res, next) {
  res.render('detalleComCli');
});

/* GET carrito */
router.get('/carrito', function(req, res, next) {
  res.render('carrito');
});

/* GET compras */
router.get('/compras', function(req, res, next) {
  res.render('compras');
});

/* GET pagoCli */
router.get('/pagoCli', function(req, res, next) {
  res.render('pagoCli');
});

/* GET confiPagoCli */
router.get('/confirPagCli', function(req, res, next) {
  res.render('confirPagCli');
});

/* GET personalizarCli */
router.get('/personalizarCli', function(req, res, next) {
  res.render('personalizarCli');
});

/* GET pedPerCli */
router.get('/pedPerCli', function(req, res, next) {
  res.render('pedPerCli');
});

/* GET confirSoliCli */
router.get('/confirSoliCli', function(req, res, next) {
  res.render('confirSoliCli');
});

/* GET confirSoliCli */
router.get('/soliCli', function(req, res, next) {
  res.render('confirSoliCli');
});

module.exports = router;
