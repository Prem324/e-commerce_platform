const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const products = [
  {
    title: 'Apple iPhone 15 Pro',
    description: 'The iPhone 15 Pro is the first iPhone to feature an aerospace-grade titanium design, using the same alloy that spacecraft use for missions to Mars.',
    price: 134900,
    category: 'Electronics',
    stock: 20,
    ratings: 4.8,
    numReviews: 120,
    images: [{ url: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070' }]
  },
  {
    title: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with two processors controlling eight microphones, and special driver units for high-resolution audio.',
    price: 29900,
    category: 'Electronics',
    stock: 50,
    ratings: 4.9,
    numReviews: 85,
    images: [{ url: 'https://images.unsplash.com/photo-1755719401908-8612266b10c2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0' }]
  },
  {
    title: 'Minimalist Leather Backpack',
    description: 'Handcrafted from premium full-grain leather, this backpack is designed for both style and functionality with a dedicated laptop compartment.',
    price: 12499,
    category: 'Accessories',
    stock: 15,
    ratings: 4.7,
    numReviews: 42,
    images: [{ url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069' }]
  },
  {
    title: 'Mechanical Gaming Keyboard',
    description: 'Customizable RGB lighting, tactile mechanical switches, and a durable aluminum frame for the ultimate gaming and typing experience.',
    price: 10999,
    category: 'Electronics',
    stock: 30,
    ratings: 4.6,
    numReviews: 56,
    images: [{ url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070' }]
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing users and create admin
    await User.deleteMany({ role: 'admin' });
    console.log('Resetting admin user...');

    adminUser = await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    });

    await Product.deleteMany();
    console.log('Products deleted');

    const sampleProducts = products.map(p => ({ ...p, user: adminUser._id }));
    await Product.insertMany(sampleProducts);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
