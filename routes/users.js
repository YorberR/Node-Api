const express = require('express');
const usersServices = require('../services/servicesUsers');
const router = express.Router();
const { CreateUserSchema, updateShemaUser, getUserSchema } = require('../schema/schemaUsers');
const validatorHendler = require('../middleware/validator.handler');
const { verifyToken } = require('../middleware/auth.handler');

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
 *         role:
 *           type: string
 *           description: User's role
 *       required:
 *         - email
 *         - role
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
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
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
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, validatorHendler(CreateUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUser = await usersServices.createUser(body)
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
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
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.patch('/:id', verifyToken,
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
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const {id} = req.params
    const userDelete = await usersServices.deleteUser(id)
    return res.json(userDelete)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
