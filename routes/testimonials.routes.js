const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const db = require('../db');

router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
	res.json(db.testimonials[`${req.params.id}`]);
})

router.route('/testimonials/random').get((req, res) => {
	const randomID = Math.floor(Math.random() * db.length);
	res.json(db.testimonials[randomID]);
});

router.route('/testimonials').post((req, res) => {
	const data = {
		id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
	}
	db.testimonials.push(data);
	res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
	db.testimonials[req.params.id].author = req.body.author;
	db.testimonials[req.params.id].text = req.body.text;
	res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
	db.testimonials.splice(`${req.params.id}`, 1);
	res.json({ message: 'OK' });
});

module.exports = router;