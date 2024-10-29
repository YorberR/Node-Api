const joi = require('joi');

const id = joi.number().integer();
const email = joi.string().email();
const password = joi.number().integer().min(5)
const role = joi.string().min(5)

const CreateUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role
});

const updateShemaUser = joi.object({
  email: email,
  role: role,
});

const getUserSchema = joi.object({
  id: id.required()
})

module.exports = {
  CreateUserSchema,
  updateShemaUser,
  getUserSchema
}
