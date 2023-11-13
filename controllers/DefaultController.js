import express from 'express';
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Welcome to the Order API');
});

export default router;