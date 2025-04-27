const express = require('express');
const servicesClient = require('../services/servicesClient')
const router = express.Router()
const {getClientSchema, createClientSchema,updateClientSchema } = require('../schema/schemaClient')
const validatorHendler = require('../middleware/validator.handler')

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
 *     summary: Obtiene un cliente por su ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Detalles del cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
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
 *     summary: Crea un nuevo cliente
 *     tags: [Clients]
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
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newClient:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validatorHendler(createClientSchema, 'body'),
  async(req, res, next)=>{
    try {
      const body = req.body
      const newClient = await servicesClient.createClient(body)
      return {newClient}
    } catch (error) {
      next(error)
    }
})

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   patch:
 *     summary: Actualiza un cliente existente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
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
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
 */
router.patch('/:id',
validatorHendler(getClientSchema, 'params'),
validatorHendler(updateClientSchema, 'body'),
async(req, res, next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const updateClient = await servicesClient.updateClients(id, body)
    return res.json(updateClient)
  } catch (error) {
    next(error)
  }
})



/**
 * @swagger
 * /api/v1/clients/{id}:
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
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
 *         description: Cliente no encontrado
 */
router.delete('/:id', async (req, res, next)=>{
  try {
    const {id} = req.params
    const clientDelete = await servicesClient.deleteClient({id})
    return res.json(clientDelete)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
