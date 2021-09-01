const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const db = require('../db');

router.route('/seats').get((req, res) => {
	res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
	res.json(db.seats[req.params.id]);
});

router.route('/seats').post((req, res) => {
	const data = {
		id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
	}
	if(db.seats.some(chosenSeat => (chosenSeat.day == req.body.day && chosenSeat.seat == req.body.seat))) {
		return res.status(404).json({message: 'seat taken'});
	} else {
		db.seats.push(seat);
		return res.json(db.seats);
	}
});

router.route('/seats/:id').delete((req, res) => {
	db.seats.splice(`${req.params.id}`, 1);
	res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
	db.seats[req.params.id].day = req.body.day;
	db.seats[req.params.id].seat = req.body.seat;
	db.seats[req.params.id].client = req.body.client;
	db.seats[req.params.id].email = req.body.email;
	res.json({ message: 'OK' });
});

module.exports = router;