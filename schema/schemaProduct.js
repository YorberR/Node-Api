const joi = require('joi');


const id = joi.number().integer()
const name = joi.string().alphanum().min(3).max(30);
const price = joi.number().integer().min(10).max(100000);
const details = joi.string().min(10)
const categoryId = joi.number().integer()

const schemaProductCreate = joi.object({
  name: name.required(),
  price: price.required(),
  description: details.required(),
  categoryId: categoryId.required()

});

const updateShemaProduct = joi.object({
  name: name,
  price: price,
  details: details,
  categoryId
});

const getProductSchema = joi.object({
  id: id.required()
})

module.exports = {
  schemaProductCreate,
  updateShemaProduct,
  getProductSchema
}
