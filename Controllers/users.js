const {v4} = require('uuid')
const  crypto = require ('../crypto.js')
const teams = require('./teams')
const userDb = {}

const registerUsr = (userName, passwd)=>{
    let userID = v4()
   userDb[userID]= {
    userName,
    password: crypto.hashPasswd(passwd)
   }
   teams.bootstrap(userID)
}

const getUser = (userId) =>{ 
    return userDb[userId]
}

const checkUser = (userName)=>{
    for (let user in userDb) {
       if (userDb[user].userName === userName){
        let userData = {...userDb[user]}
        userData.userId = user;
        return userData
       }
    }
}

const checkUsrcredentials = (userId, passwd, done)=>{
    let user = checkUser(userId)
    if (user){
       console.log('userCheckCredential:::::',user)
         return crypto.comparePasswd(passwd, user.password, done)

    }else{

        return done('Missing user')
    }
}

module.exports = { registerUsr, checkUsrcredentials, getUser, checkUser}