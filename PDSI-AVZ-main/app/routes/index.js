var router = require('express').Router();
var chat = require('./chat');
var login = require('./login');
var registro = require('../routes/registro');
let session = require('express-session');

router.use(session({secret:'secret', resave: true, saveUninitialized:true}))

router.use('/',login);

/*router.use('/registro',(req,res)=>{
    console.log('hola');
});*/

router.use('/registro',registro);


module.exports = router;