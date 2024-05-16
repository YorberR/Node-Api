const { models } = require('../libs/sequelize');


const getAllUsers = async () => {
  const response = await models.User.findAll();
  return response;
};

module.exports = {
  getAllUsers
};
