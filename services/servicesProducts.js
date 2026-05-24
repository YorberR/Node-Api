const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const getAllProducts = async (query) => {
  try {
    const { limit = 10, offset = 0 } = query;
    const data = await models.Product.findAll({
      include: [{
        association: 'category',
        attributes: ['id', 'name', 'image']
      }],
      limit,
      offset
    })
    return {
      data: JSON.parse(JSON.stringify(data))
    };
  } catch (error) {
    throw boom.badImplementation('Error getting products');
  }
};

const creteNewProduct = async (body) => {
  try {
    const newProduct = await models.Product.create(body);
    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    throw boom.badImplementation('Error creating product');
  }
};

const updateProduct = async (id, body) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    const response = await product.update(body);
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.badImplementation('Error updating the product');
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    await product.destroy();
    return {
      message: 'Product removed',
      id
    };
  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.badImplementation('Error deleting product');
  }
};

const getOneProduct = async (id) => {
  try {
    const product = await models.Product.findByPk(id, {
      include: [{
        association: 'category',
        attributes: ['id', 'name', 'image']
      }]
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.badImplementation('Error searching for the product');
  }
};

module.exports = {
  getAllProducts,
  creteNewProduct,
  updateProduct,
  deleteProduct,
  getOneProduct
};
