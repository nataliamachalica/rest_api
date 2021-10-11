const Testimonials = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

	try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonials.findOne().skip(rand);
    if(!test) res.status(404).json({ message: 'Not found' });
    else res.json(test);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getById = async (req, res) => {

	try {
		const testimonials = await Testimonials.findById(req.params.id);
		if(!testimonial) res.status(404).json({ message: 'not found' });
		else res.json(testimonials);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}

};

exports.post = async (req, res) => {

	try {
		const { author, text } = req.body;
		const newTestimonials = new Testimonials({
			author: author,
			text: text,
		});
		await newTestimonials.save();
		res.json({ message: 'OK' })
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.put = async (req, res) => {

	try {
		const test = await Testimonials.findById(req.params.id);
		if(!test){
			res.status(404).json({ message: 'not found' });
		} else {
			const { author, text } = req.body;
			await Testimonials.updateOne({ _id: req.prams.id }, {$set: {
				author: author,
				text: text,
			}});
			res.json({
				message: 'ok',
				updatedTestimonials: await Testimonials.findById(req.params.id),
			});
		}
	}

  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

	try {
		const test = await Testimonials.findById(req.params.id);
		if(!test) {
			res.status(404).json({ message: 'not found' });
		} else {
			await Testimonials.deleteOne({ _id: req.params.id });
			res.json({
				message: 'ok',
				deletedTestimonials: await test,
			});
		}
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};