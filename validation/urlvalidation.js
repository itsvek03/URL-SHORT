const { body } = require('express-validator')
const models = require('../models')
const Sequelize = models.Sequelize
const Op = Sequelize.Op

exports.urlValidation = [
    body('originalUrl')
        .exists().withMessage('URL is required')
        .notEmpty().withMessage('URL value is not valid')
        .isURL().withMessage('URL is not valid')
        .trim()
        .isLength({ min: 3 }).withMessage('URL must be at least 3 characters'),
]
