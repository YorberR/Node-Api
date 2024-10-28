const faker = require('faker');
const boom = require('@hapi/boom')
const sequelize = require('../libs/sequelize');

const getAllProducts = async (req, res) => {
  try {
    const query = 'SELECT * FROM tasks'
    const [data] = await sequelize.query(query)
    return {
      data
    }
  } catch (error) {
    console.log(error)
  }
}

const creteNewProduct = (req, res) => {
  try {
    const body = req.body
    res.json({
      ok:true,
      data:body
    })
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = (req, res) => {
  try {
    const {id} = req.params
    if(id != 1){
      throw boom.notFound('Product not found')
    }
    const body = req.body
    res.json({
      message: 'success',
      id,
      data:body
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = (req, res) => {
  try {
    const {id} = req.params
    res.json({
      message: 'deleted',
      id
    })
  } catch (error) {
    console.log(error)
  }

}

const getOneProduct = (req, res) => {
  try {
    const {id} = req.parms
    res.json({
      'id': id,
      'name': 'keyboard',
      'price': 100,
      'category': 'accessories'
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllProducts,
  creteNewProduct,
  updateProduct,
  deleteProduct,
  getOneProduct
}
