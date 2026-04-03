// CLI: npm install mongoose --save
const mongoose = require('mongoose');
const MyConstants = require('./MyConstants');

// Ưu tiên lấy URI từ biến môi trường của Render, nếu không có thì dùng MyConstants
const uri = process.env.MONGODB_URI || `mongodb+srv://${MyConstants.DB_USER}:${MyConstants.DB_PASS}@${MyConstants.DB_SERVER}/${MyConstants.DB_DATABASE}`;

async function connectMongo() {
  try {
    await mongoose.connect(uri);
    console.log(
      `Connected to MongoDB successfully!`
    );
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = connectMongo;
