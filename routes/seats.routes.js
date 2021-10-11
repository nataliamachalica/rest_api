const express = require('express');
const SeatsController = require('../controllers/seats.controller');
const router = express.Router();

router.get('/seats', SeatsController.getAll);

router.get('/seats', SeatsController.getRandom);

router.get('/seats/:id', SeatsController.getById)

router.post('/seats', SeatsController.post);

router.put('/seats/:id', SeatsController.put);

router.delete('/seats/:id', SeatsController.delete);

module.exports = router;