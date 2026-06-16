const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

const allCategory = async () => {
  try {
    const categoryAll = await models.Category.findAll()
    return categoryAll
  } catch (error) {
    if (boom.isBoom(error)) throw error
    throw boom.badImplementation('Error fetching categories')
  }
}

const oneCategory = async (id) => {
  try{
    const categoryOne = await models.Category.findByPk(id, {
      include: ['products']
    })
    if (!categoryOne) throw boom.notFound('Category not found')
    return categoryOne
  } catch (error){
    if (boom.isBoom(error)) throw error
    throw boom.badImplementation('Error fetching category')
  }
}

const createCategory = async (body) => {
  try{
    const categoryCreate = await models.Category.create(body)
    return categoryCreate
  } catch (error){
    if (boom.isBoom(error)) throw error
    throw boom.badImplementation('Error creating category')
  }
}

const updateCategory = async (id, body) => {
  try{
    const category = await models.Category.findByPk(id)
    if (!category) throw boom.notFound('Category not found')
    const categoryUpdate = await category.update(body)
    return categoryUpdate
  } catch (error){
    if (boom.isBoom(error)) throw error
    throw boom.badImplementation('Error updating category')
  }
}

const deleteCategory = async (id) => {
  try{
    const category = await models.Category.findByPk(id)
    if (!category) throw boom.notFound('Category not found')
    await category.destroy()
    return {
      message: 'Deleted category',
      id
    }
  } catch (error){
    if (boom.isBoom(error)) throw error
    throw boom.badImplementation('Error deleting category')
  }
}

module.exports = {
  allCategory,
  oneCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
