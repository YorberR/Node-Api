const express = require('express');
const productServices = require('../services/servicesProducts');
const router = express.Router();
const { schemaProductCreate, updateShemaProduct, getProductSchema } = require('../schema/schemaProduct');
const validatorHendler = require('../middleware/validator.handler');
const NodeCache = require('node-cache');

// Initialize cache with 5 minutes expiration time
const cache = new NodeCache({ stdTTL: 300 });

// Middleware to check cache
const checkCache = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  
  if (cachedResponse) {
    console.log('Response retrieved from cache');
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
 *         image:
 *           type: string
 *           description: URL to the product image
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
 * tags:
 *   name: Products
 *   description: Product management endpoints
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
 *         description: Maximum number of products to return (max 20)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter by price
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: number
 *         description: Filter by minimum price
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: number
 *         description: Filter by maximum price
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', checkCache, async (req, res, next) => {
  try {
    const limit = req.query.limit ? Math.min(parseInt(req.query.limit), 20) : 20;
    const products = await productServices.getAllProducts(req.query);
    
    // Save to cache
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
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', 
  checkCache, 
  validatorHendler(getProductSchema, 'params'), 
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const productOne = await productServices.getOneProduct(id);
      
      // Save to cache
      cache.set(req.originalUrl, productOne);
      
      return res.json(productOne);
    }
    catch (error){
      next(error);
    }
});

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *             required:
 *               - name
 *               - price
 *               - description
 *               - categoryId
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', 
  validatorHendler(schemaProductCreate, 'body'), 
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await productServices.creteNewProduct(body);
      
      // Invalidate cache after creating
      cache.flushAll();
      
      return res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
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
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/:id', 
  validatorHendler(getProductSchema, 'params'),
  validatorHendler(updateShemaProduct, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const updateProduct = await productServices.updateProduct(id, body);
      
      // Invalidate cache after updating
      cache.flushAll();
      
      return res.json(updateProduct);
    } catch (error){
      next(error);
    }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', 
  validatorHendler(getProductSchema, 'params'),
  async (req, res, next) => {
    try{
      const {id} = req.params;
      const deleteProduct = await productServices.deleteProduct(id);
      
      // Invalidate cache after deleting
      cache.flushAll();
      
      return res.json(deleteProduct);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
