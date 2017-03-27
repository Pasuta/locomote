const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');
const chai = require('chai');
const expect = chai.expect;

describe('airlines', function() {

  describe('GET /airlines', function () {
    it('should return all airlines', function (done) {
      request
        .get('/api/airlines')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const airlines = res.body;

          expect(airlines).should.not.be.empty();
          expect(airlines[0]).to.be.an('object');
          airlines[0].should.have.property('code');
          airlines[0].should.have.property('name');

          done(err);
        });
    });
  });

  describe('GET /airports', function () {
    it('should return all airports from city Dubai', function (done) {
      request
        .get('/api/airports?q=Dubai')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const airports = res.body;

          airports.should.have.lengthOf(1);

          expect(airports).should.not.be.empty();
          expect(airports[0]).to.be.an('object');

          airports[0].should.have.property('airportCode').eql('DXB');
          airports[0].should.have.property('airportName').eql('Dubai Intl Arpt');
          airports[0].should.have.property('cityCode').eql('DXB');
          airports[0].should.have.property('cityName').eql('Dubai');
          airports[0].should.have.property('countryCode').eql('AE');
          airports[0].should.have.property('countryName').eql('United Arab Emirates');
          airports[0].should.have.property('latitude').eql(25.252778);
          airports[0].should.have.property('longitude').eql(55.364444);
          airports[0].should.have.property('stateCode');
          airports[0].should.have.property('timeZone').eql('Asia/Dubai');

          done(err);
        });
    });

    it('should return empty array when airports not found', function (done) {
      request
        .get('/api/airports?q=Vavilon')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const airports = res.body;
          airports.should.be.empty();
          done(err);
        });
    });

  });

  describe('GET /search', function () {
    this.timeout(15000);
    it('should return flights', function (done) {
      request
        .get('/api/search?date=2018-01-02&from=Sydney&to=Heathrow')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          done(err);
        })
    });

    it('should return 500 when from param is wrong', function (done) {
      request
        .get('/api/search?date=2018-09-02&from=xxxxx&to=Heathrow')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);

          res.body.should.have.property('error').eql('From destination is not recognized or not found. Please, check from param');
          done(err);
        });
    });

    it('should return 500 when to param is wrong', function (done) {
      request
        .get('/api/search?date=2018-09-02&from=Sydney&to=xxxxx')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);

          res.body.should.have.property('error').eql('To destination is not recognized or not found. Please, check to param');
          done(err);
        });
    });

  });

});
