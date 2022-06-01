var router = require('express').Router();
var logincontroller= require('../controllers/login');
var rescontroller=require('../controllers/registro')
var session = require("express-session");



router.use(session({secret:"secret", resave: true, saveUninitialized: true}));

router.get('/',(req, res)=>{
    logincontroller.index(req,res);
});

router.post('/auth',(req,res)=>{
    logincontroller.auth(req,res);
});

router.post('/registroUser',(req, res)=>{
    rescontroller.registroUser(req,res);
});

module.exports = router;

