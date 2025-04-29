const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.models');
const { Product, ProductSchema } = require('./product.models');
const { Client, ClientSchema } = require('./client.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Client.init(ClientSchema, Client.config(sequelize));

    User.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Client.associate(sequelize.models);
}

module.exports = setupModels;