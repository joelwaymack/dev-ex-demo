import express from 'express';
import defaultController from './controllers/DefaultController.js';
import orderController from './controllers/OrderController.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on port: ", PORT);
});

app.use('/', defaultController);
app.use('/orders', orderController);