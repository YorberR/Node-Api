const { models } = require('../../libs/sequelize');

async function seedDatabase() {
  try {
    console.log('Iniciando la siembra de datos...');

    // Crear usuarios
    const users = await models.User.bulkCreate([
      { email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { email: 'customer@example.com', password: 'customer123', role: 'customer' }
    ]);
    console.log('Usuarios creados correctamente');

    // Crear clientes
    await models.Client.bulkCreate([
      { name: 'Cliente', lastName: 'Uno', phone: '123456789', userId: users[0].id },
      { name: 'Cliente', lastName: 'Dos', phone: '987654321', userId: users[1].id }
    ]);
    console.log('Clientes creados correctamente');

    // Crear categorías
    const categories = await models.Category.bulkCreate([
      { name: 'Electrónica', image: 'https://example.com/electronics.jpg' },
      { name: 'Ropa', image: 'https://example.com/clothing.jpg' }
    ]);
    console.log('Categorías creadas correctamente');

    // Crear productos
    await models.Product.bulkCreate([
      { 
        name: 'Smartphone XYZ', 
        price: 599, 
        description: 'Smartphone de última generación', 
        categoryId: categories[0].id 
      },
      { 
        name: 'Laptop Pro', 
        price: 1299, 
        description: 'Laptop potente para trabajo y juegos', 
        categoryId: categories[0].id 
      },
      { 
        name: 'Camiseta Premium', 
        price: 29, 
        description: 'Camiseta de algodón de alta calidad', 
        categoryId: categories[1].id 
      }
    ]);
    console.log('Productos creados correctamente');

    console.log('Datos de prueba creados correctamente');
  } catch (error) {
    console.error('Error al crear datos de prueba:', error);
    throw error;
  }
}

module.exports = seedDatabase;