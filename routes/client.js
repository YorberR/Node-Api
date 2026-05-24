const express = require('express');
const servicesClient = require('../services/servicesClient')
const router = express.Router()
const {getClientSchema, createClientSchema,updateClientSchema } = require('../schema/schemaClient')
const validatorHendler = require('../middleware/validator.handler')
const { verifyToken } = require('../middleware/auth.handler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the client
 *         name:
 *           type: string
 *           description: Client's name
 *         lastName:
 *           type: string
 *           description: Client's last name
 *         phone:
 *           type: string
 *           description: Client's phone number
 *         userId:
 *           type: integer
 *           description: ID of the associated user
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *       required:
 *         - name
 *         - lastName
 *         - phone
 */

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 getClient:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 */
router.get('/', async (req, res, next)=> {
  try {
    const getClient = await servicesClient.getClients(req, res)
    return res.send({getClient})
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 */
router.get('/:id', validatorHendler(getClientSchema, 'params'),
  async (req, res, next)=> {
    try {
      const {id} = req.params
      const oneClient = await servicesClient.findOne(id)
      res.json(oneClient)
    } catch (error) {
      next(error)
    }
  })





/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                   password:
 *                     type: string
 *             required:
 *               - name
 *               - lastName
 *               - phone
 *               - user
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newClient:
 *                   $ref: '#/components/schemas/Client'
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, validatorHendler(createClientSchema, 'body'),
  async(req, res, next)=>{
    try {
      const body = req.body
      const newClient = await servicesClient.createClient(body)
      res.status(201).json(newClient)
    } catch (error) {
      next(error)
    }
})

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   patch:
 *     summary: Update an existing client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 */
router.patch('/:id', verifyToken,
  validatorHendler(getClientSchema, 'params'),
  validatorHendler(updateClientSchema, 'body'),
  async(req, res, next)=>{
    try {
      const {id} = req.params
      const body = req.body
      const updateClient = await servicesClient.updateClients(id, body)
      res.json(updateClient)
    } catch (error) {
      next(error)
    }
})



/**
 * @swagger
 * /api/v1/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client deleted successfully
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
 *         description: Client not found
 */
router.delete('/:id', verifyToken, 
  validatorHendler(getClientSchema, 'params'),
  async(req, res, next)=>{
    try {
      const {id} = req.params
      const deleteClient = await servicesClient.deleteClient(id)
      res.json(deleteClient)
    } catch (error) {
      next(error)
    }
})

module.exports = router;
