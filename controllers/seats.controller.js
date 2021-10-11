const Seats = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

	try {
    const count = await Seats.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seats = await Seats.findOne().skip(rand);
    if(!seats) res.status(404).json({ message: 'Not found' });
    else res.json(seats);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getById = async (req, res) => {

	try {
		const seats = await Seats.findById(req.params.id);
		if(!seats) res.status(404).json({ message: 'not found' });
		else res.json(seats);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}

};

exports.post = async (req, res) => {

	try {
		const { id, day, seat, client, email } = req.body;
		const newSeats = new Seats({
			id: id,
			day: day,
			seat: seat,
			client: client,
			email: email,
		});
		await newSeats.save();
		res.json({ message: 'OK' })
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.put = async (req, res) => {

	try {
		const seats = await Seats.findById(req.params.id);
		if(!seats){
			res.status(404).json({ message: 'not found' });
		} else {
			const { id, day, seat, client, email } = req.body;
			await Seats.updateOne({ _id: req.prams.id }, {$set: {
				id: id,
				day: day,
				seat: seat,
				client: client,
				email: email,
			}});
			res.json({
				message: 'ok',
				updatedSeats: await Seats.findById(req.params.id),
			});
		}
	}

  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

	try {
		const seats = await Seats.findById(req.params.id);
		if(!seats) {
			res.status(404).json({ message: 'not found' });
		} else {
			await Seats.deleteOne({ _id: req.params.id });
			res.json({
				message: 'ok',
				deletedSeats: await seats,
			});
		}
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};