const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { JWT_SECRET } = require('./config/index');
const User = require('./models/user');



//JSON web token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try{
        //find the user specified in token.
        const user = await User.findById(payload.sub);
        if(!user) {
            return done(null, false);
        }
       
        return done(null, user);
     }catch(error){
         done(error, false);
     }
}));


//Local Strategy...
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {

    try{
    //Find the user given the email 
    const user = await User.findOne({ email });

    if(!user) {
        return done(null, false);
    }

    //Check If the password is correct..
    const checkPassword = await user.isvalidPassword(password);
    if(!checkPassword) {
        return done(null, false);
    }
    return done(null, user);

    }catch(error){
        done(error, false);
    }
   
}));