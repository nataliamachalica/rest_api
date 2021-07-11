const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const db = require('../db');

// zwraca całą tablicę
router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials);
});

// zwraca element zgodny z id
router.route('/testimonials/:id').get((req, res) => {
	res.json(db.testimonials[`${req.params.id}`]);
})

//zwraca losowy element
router.route('/testimonials/random').get((req, res) => {
	const randomID = Math.floor(Math.random() * db.length);
	res.json(db.testimonials[randomID]);
});

//dodaje nowy element do tablicy
router.route('/testimonials').get((req, res) => {
	const data = {
		id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
	}
	db.testimonials.push(data);
	res.json({ message: 'OK' });
});

//modyfikuje atrybuty author i text elementu tablicy o pasującym id
router.route('/testimonials/:id').put((req, res) => {
	db.testimonials[req.params.id].author = req.body.author;
	db.testimonials[req.params.id].text = req.body.text;
	res.json({ message: 'OK' });
});

//usuwa z tablicy wpis o podanym id
router.route('/testimonials/:id').delete((req, res) => {
	db.testimonials.splice(`${req.params.id}`, 1);
	res.json({ message: 'OK' });
});

module.exports = router;