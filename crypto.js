const  bcrypt = require ('bcrypt')

const hashPasswd = (textoPlano)=>{
   return bcrypt.hashSync(textoPlano, 10)
}

const comparePasswd = (clavePlana, hashPassword, done) =>{
   return bcrypt.compare(clavePlana, hashPassword, done )
}

module.exports=   {hashPasswd, comparePasswd}