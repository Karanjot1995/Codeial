const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const passport = require('passport')


router.get('/profile', passport.checkAuthentication ,usersController.profile)

router.get('/sign-up',usersController.signUp)

router.get('/sign-in',usersController.signIn)

router.post('/create',usersController.create)

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
  'local',
  {failureRedirect: '/users/sign-in'}
), usersController.createSession)

router.get('/sign-out', usersController.signOut)

// {failureRedirect: '/users/sign-in'}




console.log('router working')


module.exports = router