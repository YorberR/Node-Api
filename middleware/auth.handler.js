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

function verifyToken(req, res, next) {
    const passport = require('passport');
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(boom.unauthorized(err.message));
        }
        if (!user) {
            return next(boom.unauthorized('Invalid or expired token'));
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = {checkApiKey, verifyToken};