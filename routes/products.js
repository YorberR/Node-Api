const express = require('express');
const productServices = require('../services/servicesProducts');
const router = express.Router();
const { schemaProductCreate, updateShemaProduct, getProductSchema } = require('../schema/schemaProduct');
const validatorHendler = require('../middleware/validator.handler');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 });

const checkCache = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  
  if (cachedResponse) {
    console.log('Respuesta obtenida desde caché');
    return res.json(cachedResponse);
  }
  
  next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         categoryId:
 *           type: integer
 *           description: ID of the category this product belongs to
 *       required:
 *         - name
 *         - price
 *         - description
 *         - categoryId
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */

router.get('/', checkCache, async (req, res, next) => {
  try {
    const limit = req.query.limit ? Math.min(parseInt(req.query.limit), 20) : 20;
    const products = await productServices.getAllProducts(req.query);
    
    cache.set(req.originalUrl, products);
    
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', checkCache, validatorHendler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const {id} = req.params;
    const productOne = await productServices.getOneProduct(id);
    
    cache.set(req.originalUrl, productOne);
    
    return res.send(productOne);
  }
  catch (error){
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validatorHendler(schemaProductCreate, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await productServices.creteNewProduct(body);
    
    cache.flushAll();
    
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
})

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Actualiza un producto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.patch('/:id', 
  validatorHendler(getProductSchema, 'params'),
  validatorHendler(updateShemaProduct, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const updateProduct = await productServices.updateProduct(id, body);
      
      cache.flushAll();
      
      return res.json(updateProduct);
    } catch (error){
      next(error);
    }
})

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
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
 *         description: Producto no encontrado
 */
router.delete('/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const deleteProduct = await productServices.deleteProduct(id);
    
    cache.flushAll();
    
    return res.json(deleteProduct);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
