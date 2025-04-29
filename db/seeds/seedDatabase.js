const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Create categories
    const categories = await models.Category.bulkCreate([
      { name: 'Electronics', image: 'https://example.com/electronics.jpg' },
      { name: 'Clothing', image: 'https://example.com/clothing.jpg' },
      { name: 'Home & Garden', image: 'https://example.com/home.jpg' },
      { name: 'Sports', image: 'https://example.com/sports.jpg' },
      { name: 'Books', image: 'https://example.com/books.jpg' }
    ]);
    console.log('Categories created successfully');

    // Create products
    await models.Product.bulkCreate([
      { 
        name: 'Smartphone XYZ', 
        price: 599.99, 
        description: 'Latest generation smartphone with advanced features', 
        image: 'https://example.com/smartphone.jpg',
        categoryId: categories[0].id 
      },
      { 
        name: 'Laptop Pro', 
        price: 1299.99, 
        description: 'Powerful laptop for work and gaming', 
        image: 'https://example.com/laptop.jpg',
        categoryId: categories[0].id 
      },
      { 
        name: 'Premium T-shirt', 
        price: 29.99, 
        description: 'High-quality cotton t-shirt', 
        image: 'https://example.com/tshirt.jpg',
        categoryId: categories[1].id 
      },
      { 
        name: 'Garden Tools Set', 
        price: 89.99, 
        description: 'Complete set of garden tools', 
        image: 'https://example.com/gardentools.jpg',
        categoryId: categories[2].id 
      },
      { 
        name: 'Basketball', 
        price: 49.99, 
        description: 'Professional basketball', 
        image: 'https://example.com/basketball.jpg',
        categoryId: categories[3].id 
      },
      { 
        name: 'Programming Book', 
        price: 39.99, 
        description: 'Learn programming with this comprehensive guide', 
        image: 'https://example.com/book.jpg',
        categoryId: categories[4].id 
      }
    ]);
    console.log('Products created successfully');

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await models.User.bulkCreate([
      { email: 'admin@example.com', password: hashedPassword },
      { email: 'user1@example.com', password: hashedPassword },
      { email: 'user2@example.com', password: hashedPassword }
    ]);
    console.log('Users created successfully');

    // Create clients
    await models.Client.bulkCreate([
      { name: 'John', lastName: 'Doe', phone: '123-456-7890', userId: users[1].id },
      { name: 'Jane', lastName: 'Smith', phone: '098-765-4321', userId: users[2].id }
    ]);
    console.log('Clients created successfully');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = seedDatabase;