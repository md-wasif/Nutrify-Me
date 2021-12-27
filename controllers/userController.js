const User = require('../models/user');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/index');

const signToken = user => {
    return JWT.sign({
        iss: 'NutrifyMe',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET)
}


module.exports = {
    register: async (req, res, next) => {
        const { email, password } = req.value.body;

        //check if there is a user with the same email...
        let foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use..' });
        }

        //Check is there a Google account with the same Email...
        foundUser = await User.findOne({
            $or: [
                { "google.email": email },
                { "facebook.email": email },
            ]
        });
        if (foundUser) {
            //Merge them into a local..
            foundUser.methods.push('local');
            foundUser.local = {
                email: email,
                password: password
            }
            await foundUser.save();
            let token = signToken(foundUser);

            res.cookie('access_token', token, {
                httpOnly: true
            });
            res.status(200).json({ success: true });
        }

        //Create a new user...
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();
        //Generate the token 
        token = signToken(newUser);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    login: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    signOut: async (req, res, next) => {
        res.clearCookie('access_token');
        res.json({ success: true });
    },

    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    dashboard: async (req, res, next) => {
        console.log('Private api dashboard');
    }
}