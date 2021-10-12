const express = require('express');
const ConcertsController = require('../controllers/concerts.controller');
const router = express.Router();

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/random', ConcertsController.getRandom)

router.get('/concerts/:id', ConcertsController.getById);

router.post('/concerts', ConcertsController.post);

router.put('/concerts/:id', ConcertsController.put);

router.delete('concerts/:id', ConcertsController.delete);

router.get('/concerts/performer/:performer', ConcertsController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertsController.getByPrice);

router.get('/concerts/day/:day', ConcertsController.getByDay);

module.exports = router;