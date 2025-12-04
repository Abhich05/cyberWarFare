require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { Course, User } = require('../models');
const { MOCK_COURSES } = require('../config/constants');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Course.deleteMany({});
    await User.deleteMany({});

    // Seed courses
    console.log('📚 Seeding courses...');
    const courses = await Course.insertMany(MOCK_COURSES);
    console.log(`✅ Created ${courses.length} courses`);

    // Create demo users
    console.log('👤 Creating demo users...');
    const demoUsers = [
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
      },
    ];

    for (const userData of demoUsers) {
      await User.create(userData);
      console.log(`✅ Created user: ${userData.email}`);
    }

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎉 Database seeded successfully!                        ║
║                                                           ║
║   Demo Accounts:                                          ║
║   - Email: demo@example.com | Password: demo123           ║
║   - Email: test@example.com | Password: test123           ║
║                                                           ║
║   Promo Code: BFSALE25 (50% off)                         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
