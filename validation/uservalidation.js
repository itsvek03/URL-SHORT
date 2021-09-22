const { body } = require('express-validator')
const models = require('../models')
const Sequelize = models.Sequelize
const Op = Sequelize.Op

exports.userValidation = [
    body('name')
        .exists().withMessage('userName is required')
        .notEmpty().withMessage('Empty value is not valid')
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage('userName must be at least 3 characters and at most 20 characters'),

    body('email')
        .exists().withMessage('Email is required')
        .notEmpty().withMessage('Empty value is not valid')
        .isEmail().withMessage('Please provide proper e-mail Id')
        .custom(async (val) => {
            return await models.User.findOne({
                where: {
                    email: {
                        [Op.iLike]: val
                    },
                },

            }).then(result => {
                if (result) {
                    return Promise.reject('Email already exists')
                }
            })
        }),

    body('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('Empty value is not valid')
        .trim()
        .isLength([{ min: 8, max: 10 }]).withMessage('Password characters must be of 5 to 10 characters long'),

]
