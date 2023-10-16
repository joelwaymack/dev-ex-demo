const router = require('express').Router();

router.get('/', (request, response) => {
    response.send('get orders');
});

router.get('/:id', (request, response) => {
    response.send('get order by id ' + request.params.id);
});

router.post('/', (request, response) => {
    response.send('create order');
});

router.put('/:id', (request, response) => {
    response.send('update order by id ' + request.params.id);
});

router.delete('/:id', (request, response) => {
    response.send('delete order by id ' + request.params.id);
});

module.exports = router;