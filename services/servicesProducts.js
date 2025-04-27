const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const getAllProducts = async (query) => {
  try {
    const { limit = 10, offset = 0 } = query;
    const data = await models.Product.findAll({
      include: ['category'],
      limit,
      offset
    })
    return {
      data
    };
  } catch (error) {
    throw boom.badImplementation('Error al obtener los productos');
  }
};

const creteNewProduct = async (body) => {
  try {
    const newProduct = await models.Product.create(body);
    return newProduct;
  } catch (error) {
    throw boom.badImplementation('Error al crear el producto');
  }
};

const updateProduct = async (id, body) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    const response = await product.update(body);
    return response;
  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.badImplementation('Error al actualizar el producto');
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    await product.destroy();
    return {
      message: 'Producto eliminado',
      id
    };
  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.badImplementation('Error al eliminar el producto');
  }
};

const getOneProduct = async (id) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    return product;
  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.badImplementation('Error al buscar el producto');
  }
};

module.exports = {
  getAllProducts,
  creteNewProduct,
  updateProduct,
  deleteProduct,
  getOneProduct
};
