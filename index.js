const express = require('express');
const orderController = require('./controllers/OrderController');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on port: ", PORT);
});

app.use('/orders', orderController);