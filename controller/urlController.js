const models = require('../models')
const helper = require('../utils/index')

exports.createUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const userId = req.userData.id;
    const shortUrl = helper.createShortLink(8);
    const createUrl = await models.Url.create({
        originalUrl: originalUrl,
        userId: userId,
        shortUrl: shortUrl,
    })
    return res.status(200).json({
        message: "URL Created Successfully",
        createUrl
    })
}

exports.redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    console.log("short Url", shortUrl);
    const checkUrl = await models.Url.findOne({
        where: {
            shortUrl: shortUrl
        }
    })
    console.log(checkUrl)
    if (!checkUrl) {
        return res.status(404).json({ message: "Invalid URL" })
    }
    console.log(checkUrl.originalUrl)
    res.redirect(`${checkUrl.originalUrl}`)
}


