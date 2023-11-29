var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection  = require('./lib/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// INVENTARIO-TRABAJADOR
var CantTipoTrabRouter = require('./routes/Trabajador/Inventario/CantTipoTrab');
var OrdLlegadaTrabRouter = require('./routes/Trabajador/Inventario/OrdLlegadaTrab');
var PediPersoTrabRouter = require('./routes/Trabajador/Inventario/PediPersoTrab');
var ProdTipoTrabRouter = require('./routes/Trabajador/Inventario/ProdTipoTrab');

// PEDIDOS PERSONALIZADOS-TRABAJADOR
var ListPedidTrabRouter = require('./routes/Trabajador/PedidosPersonalizados/ListPedidTrab');
var PedidConfirTrabRouter = require('./routes/Trabajador/PedidosPersonalizados/PedidConfirTrab');

// REGISTRAR MUEBLES-TRABAJADOR
var RegisMuebleTrabRouter = require('./routes/Trabajador/RegistrarMuebles/RegisMuebleTrab');

// SOLICITUDES PENDIENTES POSTVENTA-TRABAJADOR
var SoliPendTrabRouter = require('./routes/Trabajador/SolicitudesPosVenta/SoliPendTrab');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({ 
  cookie: { maxAge:  oneDay},
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'false',
  secret: 'SSDFSDXCVSDFSDF3453453452434'
}))

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// INVENTARIO-TRABAJADOR
app.use('/CantTipoTrab', CantTipoTrabRouter);
app.use('/OrdLlegadaTrab', OrdLlegadaTrabRouter);
app.use('/PediPersoTrab', PediPersoTrabRouter);
app.use('/ProdTipoTrab', ProdTipoTrabRouter);

// PEDIDOS PERSONALIZADOS-TRABAJADOR
app.use('/ListPedidTrab', ListPedidTrabRouter);
app.use('/PedidConfirTrab', PedidConfirTrabRouter);

// REGISTRAR MUEBLES-TRABAJADOR
app.use('/RegisMuebleTrab', RegisMuebleTrabRouter);

// SOLICITUDES PENDIENTES POSTVENTA-TRABAJADOR
app.use('/SoliPendTrab', SoliPendTrabRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
