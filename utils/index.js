const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Creating Token */
exports.createToken = ({ id, email, name }) => {
    const token = jwt.sign({
        id: id,
        email: email,
        name: name
    }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TIME })
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return { token, decoded }
}

exports.createShortLink = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}