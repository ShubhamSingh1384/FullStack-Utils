const passport = require('passport');
const {Strategy: jwtStrategy} = require('passport-jwt');
const User = require('../../model/user');

const cookiesExtracter = req => req.cookies?.token;


module.exports = (passport) =>{
    passport.use(new jwtStrategy({
        jwtFromRequest : cookiesExtracter,
        secretOrKey : process.env.JWT_SECRET
    }, async(payload, done) =>{
        try {
            const user = await User.findById(payload.sub); // sub is the user id from jwt token in googleCallback
            if(user){
                done(null, user);
            }
            else{
                done(null, false);
            }
        } catch (error) {
            done(error, false);
        }
    }))
}