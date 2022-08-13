const express = require('express');
const passport = require('passport');
const router = express.Router();
import nodeFecth from 'node-fetch'
//autenticacion
require( `../auth`)(passport)
const teamsController = require('../Controllers/teams')
const userController = require('../Controllers/users');



router.route('/')
.get(
    passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        
    let user = userController.getUser(req.user.userId)
    res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamUser(req.user.userId)
    })
})
.put(passport.authenticate('jwt',{session: false}),
(req, res)=>{
    
    teamsController.setTeam(req.user.userId, req.body.allTeam)
    res.status(200).json({msg: "Completed!"})

    
})

router.route('/pokemons')
.post(passport.authenticate('jwt',{session: false}) ,
(req, res)=>{
    let pokeName = req.body.name
    console.log(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)

   
    try{
        const respo =  nodeFecth(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`,{method: 'GET'})
        // handle success
        console.log(respo)
        let pokemon = {
            name: pokeName,
            pokedexnumber: respo.data.id
        }
        teamsController.addPoke(req.user.userId, pokemon)
        res.status(201).json(pokemon)
    }
    catch{ (error) =>  {
            // handle error
            console.log('err::::',error)
            res.status(400).json({msj:error})
        }
    }
   
    
   
    
})

router.route('/pokemons:pokeid')
.delete((req, res)=>{
    
    res.status(200).json({msj: "completed!!"})
    
})

exports.router = router

