// const { boom } = require('@hapi/boom')
const { models } = require('../libs/sequelize')

const allCategory = async () => {
  try {
    const categoryAll = await models.Category.findAll()
    return categoryAll
  } catch (error) {
    console.log(error)
  }
}

const oneCategory = async (id) => {
  try{
    const categoryOne = await models.Category.findByPk(id, {
      include: ['products']
    })
    return categoryOne
  } catch (error){
    console.log(error)
  }
}

const createCategory = async (body) => {
  try{
    const categoryCreate = await models.Category.create(body)
    return categoryCreate
  } catch (error){
    console.log(error)
  }
}

const updateCategory = async (id, body) => {
  try{
    const category = await models.Category.findByPk(id)
    if (!category) {
      throw new Error('Category not found')
    }
    const categoryUpdate = await category.update(body)
    return categoryUpdate
  } catch (error){
    console.log(error)
    throw error
  }
}

const deleteCategory = async (id) => {
  try{
    const category = await models.Category.findByPk(id)
    if (!category) {
      throw new Error('Category not found')
    }
    await category.destroy()
    return {
      message: 'Deleted category',
      id
    }
  } catch (error){
    console.log(error)
    throw error
  }
}

module.exports = {
  allCategory,
  oneCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
