const express = require('express');
const ConcertsController = require('../controllers/concerts.controller');
const router = express.Router();

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/random', ConcertsController.getRandom)

router.get('/concerts/:id', ConcertsController.getById);

router.post('/concerts', ConcertsController.post);

router.put('/concerts/:id', ConcertsController.put);

router.delete('concerts/:id', ConcertsController.delete);

module.exports = router;