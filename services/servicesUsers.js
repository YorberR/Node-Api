const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize');

const getAllUsers = async () => {
  try {
    const response = await models.User.findAll();
    return response;
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
    return user
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Error searching for user')
  }
}

const createUser = async (body) => {
  try {
    const newUser = await models.User.create(body);
    return {
      user: newUser,
      message: 'User created',
    }
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
    return response
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

module.exports = {
  getAllUsers,
  createUser,
  UpdateUser,
  deleteUser,
  findOne
};
