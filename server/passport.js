const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const { JWT_SECRET } = require('./config/index');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = require('./config/index');

const User = require('./models/user');



//JSON web token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token.
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        done(error, false);
    }
}));


//Google Services Strategy..
passport.use('googleToken', new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {

    try {
        //Check If a user with google Id is Present..
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save();
        done(null, newUser);

    } catch (error) {
        done(error, false);
    }
}));


//Facebook Strategy Oauth
passport.use(new FacebookTokenStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {

    try {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false);
    }
}))


//Local Strategy...
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try {
        //Find the user given the email 
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false);
        }

        //Check If the password is correct..
        const checkPassword = await user.isvalidPassword(password);
        if (!checkPassword) {
            return done(null, false);
        }
        return done(null, user);

    } catch (error) {
        done(error, false);
    }

}));