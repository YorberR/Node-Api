const faker = require('faker');
const boom = require('@hapi/boom');

const getAllProducts = (req, res) => {
  try {
    const products = []
    const { size } = req.query
    const limit = size || 5
    for (let index = 0; index < limit; index++) {
      products.push({
        'id': faker.datatype.uuid(),
        'name': faker.commerce.productName(),
        'price': parseInt(faker.commerce.price(), 10),
        'image': faker.image.imageUrl(),
      })
    }
    return products
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
