const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const userController = require('../controllers/userController');
const passportConf = require('../server/passport');


const {validateBody, schemas} = require('../validation/routeValidation');
const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogleOauth = passport.authenticate('googleToken', {session: false});
const passportFacebookOauth = passport.authenticate('facebook-token', {session: false});


router.route('/register')
  .post(validateBody(schemas.authSchema), userController.register);

router.route('/login')
  .post(validateBody(schemas.authSchema), passportSignIn, userController.login);  

  router.route('/logout')
  .get(passportJWT, userController.signOut);  

router.route('/oauth/google')
  .post(passportGoogleOauth, userController.googleOAuth);  

router.route('/oauth/facebook')
  .post(passportFacebookOauth, userController.facebookOAuth);   


module.exports = router;