const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const userController = require('../controllers/userController');
const passportConf = require('../passport');


const {validateBody, schemas} = require('../validation/routeValidation');
const passportSignIn = passport.authenticate('local', {session: false});

router.route('/register')
  .post(validateBody(schemas.authSchema), userController.register);

router.route('/login')
  .post(validateBody(schemas.authSchema), passportSignIn, userController.login);  


module.exports = router;