const express = require('express');
const usersServices = require('../services/servicesUsers');
const router = express.Router();
const { CreateUserSchema, updateShemaUser, getUserSchema } = require('../schema/schemaUsers');
const validatorHendler = require('../middleware/validator.handler');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the user
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           description: User's role
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res, next) => {
  try {
    const getUsers = await usersServices.getAllUsers(req, res)
    return res.send({getUsers})
  } catch (error) {
    next(error)
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', validatorHendler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const {id} = req.params
    const oneUser = await usersServices.findOne(id)
    return res .json(oneUser)
  } catch (error) {
    next(error)
  }
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validatorHendler(CreateUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUser = await usersServices.createUser(body)
    return newUser
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/:id', 
  validatorHendler(getUserSchema, 'params'),
  validatorHendler(updateShemaUser, 'body'),
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

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       404:
 *         description: Usuario no encontrado
 */
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
