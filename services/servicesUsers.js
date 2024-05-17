const { models } = require('../libs/sequelize');


const getAllUsers = async () => {
  const response = await models.User.findAll();
  return response;
};

const crateUser = async (body) => {
  try {
    const newUser = await models.User.create(body);
    return {
      user: newUser,
      message: 'User created',
    }
  } catch (error) {
    console.log(error);
  }
}

const UpdateUser = async (id, body) => {
  try {
    const user = await models.User.findByPk(id)
    if (!user) {
      return {
        error: 'User not found',
      }
    }
    const response = await user.update(body)
    return response
  }catch (error) {
    console.log(error);
  }
}

const deleteUser = async (id) => {
  try {
    const user = await models.User.findOne(id)
    await user.destroy()
    return {
      message: 'User deleted',
      id
    }
  }catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  crateUser,
  UpdateUser,
  deleteUser
};
