const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
//Controllers
const usersController = require('../Controllers/users')
usersController.registerUsr('Ema', 'Emas23' )
usersController.registerUsr('ELE', '12324')


router.route('/')
.get((req, res)=>{
    res.status(200).send('Auth router')
})

router.route('/login')
.post( (req, res)=>{
    if(!req.body){
        return  res.status(400).json({msj: 'Missing data'})
     }else if(!req.body.user || !req.body.passwd) {
        return  res.status(400).json({msj: "Missing data"})
     }
    //Comprobar las credenciales
    usersController.checkUsrcredentials(req.body.user, req.body.passwd, (err, ressult)=>{
        if (!ressult || err) {
          return  res.status(401).json({msg: "Credenciales invalidas"})
        }
        //Si son validad las credenciales
        let {userId} = usersController.checkUser(req.body.user)
        const token = jwt.sign({userId }, `${process.env.JWTSECRET}`)
       res.status(200).json({token});
    })
})
exports.router =  router