import express from 'express';
import { getOrders, getOrderById, getOrderSummary } from '../data/Data.js';

const router = express.Router();

router.get('/', async (request, response) => {
    response.json(await getOrders());
});

router.get('/summary', async (request, response) => {
    response.json(await getOrderSummary());
});

router.get('/:id', async (request, response) => {
    response.json(await getOrderById(request.params.id));
});

export default router;