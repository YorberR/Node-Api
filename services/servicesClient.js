const { boom } = require('@hapi/boom')

const { models } = require('../libs/sequelize')

const getClients = async () => {
  const response = await models.Client.findAll()
  return response
}

const findOne = async (id) => {
  try {
    const client = await models.Client.findByPk(id)
    if (!client) {
      throw boom.notFound('client not found')
    }
    return client
  } catch (error) {
    console.log(error)
  }
}

const createClient = async (body) => {
  try {
    console.log(body)
    const newClient = await models.Client.create(body)
    console.log(newClient)
    return {
      user: newClient,
      message: 'Client created'
    }
  } catch (error) {
    console.log(error)
  }
}

const updateClient = async (id, body) => {
  try{
    const client = await models.Client.findByPk(id)
    if (!client) {
      return {
        error: 'client not found'
      }
    }
    const response = await client.update(body)
    return {response}
  } catch (error) {
    console.log(error)
  }
}

const deleteClient = async (id) => {
  try {
    const client = await models.Client.findOne(id)
    await client.destroy()
    return {
      message: 'Client delete',
      id
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  findOne
}
