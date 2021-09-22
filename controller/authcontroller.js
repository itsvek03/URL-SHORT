const models = require('../models')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_AUTH_SECRET_KEY)
const jwt = require('jsonwebtoken')
const helper = require('../utils/index')

exports.googleAuthCOntroller = async (req, res) => {
    const { tokenId } = req.body;
    try {
        const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_AUTH_SECRET_KEY })
        let { email_verified, name, email } = response.payload;
        if (email_verified) {
            const existUser = await models.User.findOne({
                where: { email: email }
            })
            if (existUser) {
                const token = jwt.sign({ id: existUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TIME });
                const { id, name, email } = existUser;
                return res.status(200).json({ token, userInfo: { id, name, email } })
            } else {
                const password = response.payload.email + process.env.JWT_SECRET_KEY;
                const newUser = await models.User.create({
                    name: response.payload.name,
                    email: response.payload.email,
                    password: password
                })
                const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TIME });
                const { id, name, email } = newUser;
                return res.status(200).json({ token, userInfo: { id, name, email } })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const newusers = await models.User.create({
        name: name,
        email: email,
        password: password
    })
    if (!newusers) {
        return res.status(402).json({ message: 'User not created' })
    }
    return res.status(200).json({ message: 'User created successfully' })
}



exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(400).json({ message: 'Please enter your email and password' })
    }
    const userData = await models.User.findOne({
        where: {
            email: email,
        }
    })

    if (!userData) {
        return res.status(400).json({ message: 'Email is Invalid' })
    }
    let checkPassword = await userData.comparePassword(password);

    if (checkPassword) {
        let { token, decoded } = helper.createToken(userData)
        return res.status(200).json({
            message: 'Login Successfully',
            token: token
        })
    } else {
        return res.status(400).json({ message: 'Wrong Credentials' })
    }

}



