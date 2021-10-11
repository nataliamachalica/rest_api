const Concerts = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

	try {
    const count = await Concerts.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concerts = await Concerts.findOne().skip(rand);
    if(!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getById = async (req, res) => {

	try {
		const concerts = await Concerts.findById(req.params.id);
		if(!concerts) res.status(404).json({ message: 'not found' });
		else res.json(concerts);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}

};

exports.post = async (req, res) => {

	try {
		const { performer, genre, price, day, image } = req.body;
		const newConcerts = new Concerts({
			performer: performer,
			genre: genre,
			price: price,
			day: day,
			image: image,
		});
		await newConcerts.save();
		res.json({ message: 'OK' })
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.put = async (req, res) => {

	try {
		const concerts = await Concerts.findById(req.params.id);
		if(!concerts){
			res.status(404).json({ message: 'not found' });
		} else {
			const { performer, genre, price, day, image } = req.body;
			await Concerts.updateOne({ _id: req.prams.id }, {$set: {
				performer: performer,
				genre: genre,
				price: price,
				day: day,
				image: image,
			}});
			res.json({
				message: 'ok',
				updatedConcerts: await Concerts.findById(req.params.id),
			});
		}
	}

  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

	try {
		const concerts = await Concerts.findById(req.params.id);
		if(!concerts) {
			res.status(404).json({ message: 'not found' });
		} else {
			await Concerts.deleteOne({ _id: req.params.id });
			res.json({
				message: 'ok',
				deletedConcerts: await concerts,
			});
		}
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};