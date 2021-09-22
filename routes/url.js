const express = require('express');
const router = express.Router()
const urlController = require('../controller/urlController');
const { urlValidation } = require('../validation/urlvalidation')
const validationError = require('../middleware/validationError')
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, urlValidation, validationError, urlController.createUrl)

router.get('/:shortUrl', urlController.redirectUrl)




module.exports = router;