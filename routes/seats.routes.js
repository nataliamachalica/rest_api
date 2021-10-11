const express = require('express');

const SeatsController = require('../controllers/seats.controller');

const router = express.Router();

//const db = require('../db');

//const { v4: uuidv4 } = require('uuid');

/* ---- seats get ---->

router.route('/seats').get((req, res) => {
	res.json(db.seats);
});
*/

router.get('/seats', SeatsController.getAll);

/* ---- get random ---->

router.route('/seats/random').get((req, res) => {
	const random = Math.ceil(Math.random() * 10);
	const length = db.seats.length;
	const id = random%length +1;
	console.log(random, length, id);
	res.send(res.json(db.seats.filter(testimonial => testimonial.id == id)));
})
*/

router.get('/seats', SeatsController.getRandom);

/* ---- get id ---->

router.route('/seats/:id').get((req, res) => {
	res.send(res.json(db.seats.filter(testimonial => testimonial.id == req.params.id)));
});
*/

router.get('/seats/:id', SeatsController.getById)

/* ---- post ---->

router.route('/seats').post((req, res) => {

	const id = db.seats.length;
	const seat = req.body.seat;
  const client = req.body.client;
	const email = req.body.email;
	const concert = req.body.concert;
	const day = req.body.day;

	req.body.id = id + 1;
	res.json(req.body);

	db.seats.push({
		id: id,
		seat: seat,
		client: client,
		email: email,
		concert: concert,
		day: day
	});

	req.io.emit('seatsUpdated', db.seats);
});
*/

router.post('/seats', SeatsController.post);

/* ---- put ---->

router.route('/seats/:id').put((req, res) => {
	db.seats = db.seats.map(item => {
		if (item.id == req.params.id) {
			return {
				id: req.params.id,
				author: req.body.author,
				text: req.body.text,
			};
		}else {
			return item;
		};
	})
	res.json({ message: 'OK' });
});
*/

router.put('/seats/:id', SeatsController.put);

/* ---- delete ---->

router.route('/seats/:id').delete((req, res) => {
	db.seats.splice(req.params.id, 1);
	res.json({ message: 'OK' });
});
*/

router.delete('/seats/:id', SeatsController.delete);

module.exports = router;