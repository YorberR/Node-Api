const express = require('express');
const serviceUsers = require('../services/servicesUsers')
const router = express.Router()
const {getClientSchema, createClientSchema, updateClientSchema} = require('../schema/schemaUsers')
const validatorHendler = require('../middleware/validator.handler')

router.get('/', async(req, res, next) => {
  try{
    const getClient = await serviceUsers.getClient(req, res)
    return res.send({getClient})
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHendler(getClientSchema, 'params'),
  async (req, res, next) => {
    try{
      const {id} = req.params
      const oneClient = await serviceUsers.findOne(id)
      res.json(oneClient)
    } catch (error) {
      next(error)
    }
})

router.post('/', validatorHendler(createClientSchema, 'body'),
  async(req, res, next) =>{
    try{
      const body = req.body
      const newClient = await serviceUsers.createClient(body)
      return {newClient}
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id', validatorHendler(updateClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const body = req.body
      const updateClient = await serviceUsers.updateClient(id, body)
      return res.json(updateClient)
    } catch (error) {
      next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} =req.params
    const clientDelete = await serviceUsers.deleteClient({id})
    return res.json(clientDelete)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
