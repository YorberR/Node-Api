const express = require('express');
const productServices = require('../services/servicesProducts');
const router = express.Router();
const validatorHendler = require('../middleware/validator.handler')
const { schemaProductCreate, updateShemaProduct, getProductSchema } = require('../schema/schemaProduct')

router.get('/', async (req, res, next) => {
  try {
    const products = await productServices.getAllProducts(req, res)
    res.json(products)
  } catch (error) {
    next(error)
  }

})

router.post('/',  validatorHendler(schemaProductCreate, 'body'),
  async (req, res) => {
  const newProduct = await productServices.creteNewProduct(req, res)
  return newProduct
})

router.patch('/:id',
  validatorHendler(getProductSchema, 'params'),
  validatorHendler(updateShemaProduct, 'body'),
  async (req, res) => {
  const updateProduct = await productServices.updateProduct(req, res)
  res.json(updateProduct)
})

router.delete('/:id', async (req, res) => {
  const deleteProduct = await productServices.deleteProduct(req, res)
  return deleteProduct
})

router.get('/:id', validatorHendler(getProductSchema, 'params'),
  async (req, res) => {
  const getOneProduct = await productServices.getOneProduct(req, res)
  return getOneProduct
})

module.exports = router;
