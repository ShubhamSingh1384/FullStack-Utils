const express = require('express')
const { Reigster, VerfiyEmail } = require('../controllers/authController.js')

const AuthRoutes=express.Router()

AuthRoutes.post('/register',Reigster)
AuthRoutes.post('/verifyEmail',VerfiyEmail)


module.exports =  {AuthRoutes}