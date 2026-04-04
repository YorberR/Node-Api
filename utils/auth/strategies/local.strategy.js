const { Strategy } = require('passport-local');
const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { removePassword } = require('../../../services/servicesUsers');

const LocalStrategy = new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
            done(boom.unauthorized(), false);
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            done(boom.unauthorized(), false);
            return;
        }
        done(null, removePassword(user));
    } catch (error) {
        done(error, false);
    }
});

module.exports = LocalStrategy;