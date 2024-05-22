const express = require('express');
const usersServices = require('../services/servicesUsers');
const router = express.Router();
const {CreateUserSchema, UpdateUserSchema, getUserSchema} = require('../schema/schemaUsers')
const validatorHendler = require('../middleware/validator.handler')

router.get('/', async (req, res, next) => {
  try {
    const getUsers = await usersServices.getAllUsers(req, res)
    return res.send({getUsers})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHendler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params
    const oneUser = await usersServices.findOne(id)
    return res .json(oneUser)
  } catch (error) {
    next(error)
  }
});

router.post('/', validatorHendler(CreateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body
    const newUser = await usersServices.createUser(body)
    return newUser
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHendler(UpdateUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params
    const body = req.body
    const updateUser = await usersServices.UpdateUser(id, body)
    return res.json(updateUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const userDelete = await usersServices.deleteUser(id)
    return res.json(userDelete)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
