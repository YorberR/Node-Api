const boom = require('@hapi/boom');
const {config} = require('../config/config')

function checkApiKey(req, res, next) {
    const apiKey = req.header['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized('Invalid API key'));
    }
}

module.exports = {checkApiKey};