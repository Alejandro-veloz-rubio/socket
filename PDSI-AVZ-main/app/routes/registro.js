var router= require('express').Router();
var rescontroller = require('../controllers/registro')
var session = require("express-session");



router.use(session({secret:"secret", resave: true, saveUninitialized: true}));


router.get('/',(req, res)=>{
    //console.log('hola');
    rescontroller.registro(req,res);
});



module.exports=router;