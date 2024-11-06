const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(30);
const price = joi.number().integer().min(10).max(100000);
const details = joi.string().min(10)

const schemaProductCreate = joi.object({
  name: name.required(),
  price: price.required(),
  details: details.required()
});

const updateShemaProduct = joi.object({
  name: name,
  price: price,
  details: details
});

const getProductSchema = joi.object({
  id: id.required()
})

module.exports = {
  schemaProductCreate,
  updateShemaProduct,
  getProductSchema
}
