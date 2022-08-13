
const {Strategy, ExtractJwt} = require('passport-jwt');


module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: `${process.env.JWTSECRET}`
    }
    
    passport.use(new Strategy(opts, (decoded, done)=>{
        console.log('decoded:::',decoded)
        return done(null, decoded)
    }))



}