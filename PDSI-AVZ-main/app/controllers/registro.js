const connection = require('../../bd/mysql');

module.exports={
    registro:(req,res)=>{
        res.render('registro');
    },

    registroUser:(req,res)=>{
        if(req.body.registro == ""){
            let pass  = (req.body.pass)
            connection.query('INSERT INTO datos(username, correo, pass) VALUES (?, ?, ?)',[req.body.username, req.body.email, pass], function(err, result, fields){
                
                if (err) throw err;
                res.redirect('/')
                
            })
           }else{
            res.redirect('/')
           }
    },
};

