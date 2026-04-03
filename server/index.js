// CLI: npm install express body-parser mongoose cors --save
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const cors = require('cors');
app.use(cors());

// database
const connectMongo = require('./utils/MongooseUtil');
connectMongo();

// apis
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
