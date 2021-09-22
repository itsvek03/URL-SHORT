const express = require('express');
const router = express.Router()
const authController = require('../controller/authcontroller')
const { userValidation } = require('../validation/uservalidation')
const validationError = require('../middleware/validationError')

router.post('/google-login', authController.googleAuthCOntroller)

router.post('/signup', userValidation, validationError, authController.signUp)

router.post('/login', authController.login)


module.exports = router;