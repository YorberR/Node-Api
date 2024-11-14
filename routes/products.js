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

router.get('/:id', validatorHendler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const productOne = await productServices.getOneProduct(id)
      return res.send(productOne)
    }
    catch (error){
      next(error)
    }
})

router.post('/',  validatorHendler(schemaProductCreate, 'body'),
  async (req, next) => {
    try {
      const body = req.body
      const newProduct = await productServices.creteNewProduct(body)
      return newProduct
    } catch (error) {
      next(error)
    }
})

router.patch('/:id',
  validatorHendler(getProductSchema, 'params'),
  validatorHendler(updateShemaProduct, 'body'),
  async (req, next) => {
    try {
      const {id} = req.params
      const body = req.body
      const updateProduct = await productServices.updateProduct(id, body)
      return updateProduct
    } catch (error){
      next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const deleteProduct = await productServices.deleteProduct(id)
    return res.json(deleteProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
