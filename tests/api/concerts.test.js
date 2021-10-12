const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concerts = require('../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

	before(async () => {

		const testFirstConcert = new Concerts({
			performer: 'performer1',
      genre: 'genre1',
      price: 10,
      day: 1,
      image: 'img'
    });

		await testFirstConcert.save();

		const testSecondConcert = new Concerts({
			performer: 'performer2',
      genre: 'genre2',
      price: 20,
      day: 1,
      image: 'img'
    });

		await testSecondConcert.save();

		const testThirdConcert = new Concerts({
			performer: 'performer2',
      genre: 'genre2',
      price: 30,
      day: 2,
      image: 'img'
    });

		await testThirdConcert.save();

		const testFourthConcert = new Concerts({
			performer: 'performer3',
      genre: 'genre2',
      price: 40,
      day: 1,
      image: 'img'
    });

		await testFourthConcert.save();

		const testFifthConcert = new Concerts({
			performer: 'performer4',
      genre: 'genre1',
      price: 20,
      day: 2,
      image: 'img'
    });

		await testFifthConcert.save();
	});

	after(async () => {
		await Concerts.deleteMany();
	});

	it('"/performer/:performer" should return an array with concerts filtered by performer', async () => {
		const res = await request(server).get('/api/concerts/performer/performer2');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(2);
	});

  it('"/genre/:genre" should return an array with concerts filtered by genre', async () => {
		const res = await request(server).get('/api/concerts/genre/genre2');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(3);
	});

  it('"/performer/:price_min/price_max" should return an array with concerts filtered by price', async () => {
		const res = await request(server).get('/api/concerts/price/10/30');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(4);
	});

  it('"/day/:day" should return an array with concerts filtered by day', async () => {
		const res = await request(server).get('/api/concerts/day/1');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(3);
	});
});