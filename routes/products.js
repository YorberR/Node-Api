const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
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
  res.json(products)
})

router.get('/:id', (req, res) => {
  const {id} = req.parms
  res.json({
    'id': id,
    'name': 'keyboard',
    'price': 100,
    'category': 'accessories'
  });
})

module.exports = router;
