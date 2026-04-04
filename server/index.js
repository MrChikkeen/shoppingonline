const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;
const path = require('path');
const cors = require('cors');

// ================= MIDDLEWARE =================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS
app.use(cors({
  origin: [
    process.env.CLIENT_ADMIN_URL,
    process.env.CLIENT_CUSTOMER_URL,
    'http://localhost:3000',
    'http://localhost:3001'
  ].filter(Boolean), // tránh undefined
  credentials: true
}));

// ================= DATABASE =================
const connectMongo = require('./utils/MongooseUtil');
connectMongo();

// ================= API =================
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// ================= STATIC FILES =================

// Admin (ưu tiên trước)
app.use('/admin', express.static(path.join(__dirname, '../client-admin/build')));

app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client-admin/build/index.html'));
});

// Customer (default)
app.use(express.static(path.join(__dirname, '../client-customer/build')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client-customer/build/index.html'));
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});