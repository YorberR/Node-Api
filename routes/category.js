const express = require('express');
const servicesCategory = require('../services/servicesCategory')
const router = express.Router()
const {createCategory,updateCategory, getCategory} = require('../schema/schemaCategory')
const validatorHendler = require('../middleware/validator.handler')

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the category
 *         name:
 *           type: string
 *           description: Name of the category
 *         image:
 *           type: string
 *           description: URL of the category image
 *       required:
 *         - name
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await servicesCategory.allCategory()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await servicesCategory.oneCategory(id)
    res.json(category)
  } catch (error) {
    next(error)
  }
})


/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid data
 */
router.post('/', validatorHendler(createCategory, 'body'),
  async(req, res, next)=>{
  try {
    const body = req.body
    const newCategory = await servicesCategory.createCategory(body)
    res.json(newCategory)
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.patch('/:id',
  validatorHendler(getCategory, 'params'),
  validatorHendler(updateCategory, 'body'),
  async(req, res, next)=>{
  try {
    const { id } = req.params
    const body = req.body
    const updateCategory = await servicesCategory.updateCategory(id, body)
    res.json(updateCategory)
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *         description: Category not found
 */
router.delete('/:id',
  async(req, res, next)=>{
  try {
    const { id } = req.params
    const deleteCategory = await servicesCategory.deleteCategory(id)
    res.json(deleteCategory)
  } catch (error) {
    next(error)
  }
})


module.exports = router;
