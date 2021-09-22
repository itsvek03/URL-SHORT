const express = require('express')
const router = express.Router();


const users = require('./users')
router.use('/users', users)

const url = require('./url')
router.use('/url', url)

module.exports = router;