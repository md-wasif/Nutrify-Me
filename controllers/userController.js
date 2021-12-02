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

        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            res.status(403).json({ error: 'Email is already in use..' });
        }
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();
        //Generate the token 
        // const token = signToken(newUser);
        // res.status(200).json({token});
        res.status(200).json({ user: newUser.id });
    },

    login: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
}