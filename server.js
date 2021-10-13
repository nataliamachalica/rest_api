const express = require('express');
const cors = require('cors');

const app = express();

const path = require('path');
const socket = require('socket.io');

const mongoose = require('mongoose');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

// connects our backend code with the database
const dbURI = process.env.NODE_ENV === 'production'
    ? 'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.amocr.mongodb.net/NewWaveDB?retryWrites=true&w=majority'
    : 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect( dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

/*db.once('open', () => {
  console.log('Connected to the database');
});*/

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors(corsOptions));

app.use((req, res, next) => {
	req.io = io;
	next();
});

/*app.use((req, res, next) => {
  req.db = db;
  next();
});*/

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).send('404 not found' );
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log('New socket! ' + socket.id);
});

module.exports = server;