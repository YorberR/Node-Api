const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  try {
    const response = await models.User.findAll();
    return response.map(user => removePassword(user));
  } catch (error) {
    throw boom.badImplementation('Error getting users');
  }
};

const findByEmail = async (email) => {
  try {
    const response = await models.User.findOne({ where: { email } });
    return removePassword(response);
  } catch (error) {
    throw boom.badImplementation('Error getting users');
  }
};

const findOne = async (id) => {
  try {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return removePassword(user)
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Error searching for user')
  }
}

const createUser = async (body) => {
  try {
    const hash = await bcrypt.hash(body.password, 10);
    const newUser = await models.User.create({ ...body, password: hash });
    return removePassword(newUser);
  } catch (error) {
    throw boom.badImplementation('Error creating user: ' + error.message);
  }
}

const UpdateUser = async (id, body) => {
  try {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    const response = await user.update(body)
    return removePassword(response)
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Error updating user');
  }
}

const deleteUser = async (id) => {
  try {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    await user.destroy()
    return {
      message: 'Deleted user',
      id
    }
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Internal Server Error');
  }
}

const removePassword = (user) => {
  if (!user) return user;
  const userData = user.toJSON ? user.toJSON() : user;
  delete userData.password;
  return userData;
};

module.exports = {
  getAllUsers,
  createUser,
  UpdateUser,
  deleteUser,
  findOne,
  findByEmail,
  removePassword
};