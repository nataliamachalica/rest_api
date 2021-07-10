const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
	{ id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
	{ id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
	{ id: 3, author: 'Carol Smith', text: 'I don\'t know what I am doing.' },
	{ id: 4, author: 'Stephen King', text: 'This company is worthles' },
];

// zwraca całą tablicę
app.get('/testimonials', (req, res) => {
	res.json(db);
})

// zwraca element zgodny z id
app.get('/testimonials/:id', (req, res) => {
	res.json(db[`${req.params.id}`]);
})

//zwraca losowy element
app.get('/testimonials/random', (req, res) => {
	const randomID = Math.floor(Math.random() * db.length);
	res.json(db[randomID]);
});

//dodaje nowy element do tablicy
app.post('/testimonials', (req, res) => {
	const data = {
		id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
	}
	db.push(data);
	res.json({ message: 'OK' });
});

//modyfikuje atrybuty author i text elementu tablicy o pasującym id
app.put('/testimonials/:id', (req, res) => {
	db[req.params.id].author = req.body.author;
	db[req.params.id].text = req.body.text;
	res.json({ message: 'OK' });
})

//usuwa z tablicy wpis o podanym id

app.delete('/testimonials/:id', (req, res) => {
	db.splice(`${req.params.id}`, 1);
	res.json({ message: 'OK' });
});

app.use((req, res) => {
	res.status(404).send('404 not found');
})

app.listen(8000, () => {
	console.log('Server is running on port: 8000');
});