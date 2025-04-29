const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

const getClients = async () => {
  try {
    const response = await models.Client.findAll({
      include: ['User']
    })
    return response
  } catch (error) {
    throw boom.badImplementation('Error getting clients')
  }
}

const findOne = async (id) => {
  try {
    const client = await models.Client.findByPk(id, {
      include: ['User']
    })
    if (!client) {
      throw boom.notFound('Client not found')
    }
    return client
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Error searching for client')
  }
}

const createClient = async (body) => {
  try {
    const newUser = await models.User.create(body.user)
    const newClient = await models.Client.create({
      ...body,
      userId: newUser.id
    })
    return newClient
  } catch (error) {
    throw boom.badImplementation('Error creating client: ' + error.message)
  }
}

const updateClients = async (id, body) => {
  try {
    const client = await models.Client.findByPk(id)
    if (!client) {
      throw boom.notFound('Client not found')
    }
    const response = await client.update(body)
    return response
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Error updating the client')
  }
}

const deleteClient = async (id) => {
  try {
    const client = await models.Client.findByPk(id)
    if (!client) {
      throw boom.notFound('Client not found')
    }
    await client.destroy()
    return {
      message: 'Deleted customer',
      id
    }
  } catch (error) {
    if (error.isBoom) throw error
    throw boom.badImplementation('Error deleting client')
  }
}

module.exports = {
  getClients,
  createClient,
  updateClients,
  deleteClient,
  findOne
}
