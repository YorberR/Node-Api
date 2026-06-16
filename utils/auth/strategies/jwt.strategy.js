const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');
const { models } = require('../../../libs/sequelize');
const { removePassword } = require('../../../services/servicesUsers');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await models.User.findByPk(payload.sub);
        if (!user) {
            return done(null, false);
        }
        return done(null, removePassword(user));
    } catch (error) {
        return done(error, false);
    }
});

module.exports = jwtStrategy;