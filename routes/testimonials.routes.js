const express = require('express');
const TestimonialsController = require('../controllers/testimonials.controller');
const router = express.Router();

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getById);

router.post('/testimonials', TestimonialsController.post);

router.put('/testimonials/:id', TestimonialsController.put);

router.delete('/testimonials/:id', TestimonialsController.delete);

module.exports = router;