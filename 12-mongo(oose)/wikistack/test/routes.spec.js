var supertest = require('supertest');
var expect = supertest.expect;
var app = require('../app');
var agent = supertest.agent(app);

describe('http requests', function() {

  describe('GET /', function() {
  	it('gets 200', function(done) {
    	return agent
	  		.get('/')
    		.expect(200, done)
	  });
  });

  describe('GET /add', function () {
    it('gets 200', function (done) {
    	return agent
    		.get('/wiki/add')
    		.expect(200, done)
    });
  });

  describe('GET /wiki/:urlTitle', function() {
    it('gets 404 on page that doesnt exist', function() {});
    it('gets 200 on page that does exist', function() {});
  });

  describe('GET /wiki/search', function() {
    it('gets 200', function() {});
  });

  describe('GET /wiki/:urlTitle/similar', function() {
    it('gets 404 for page that doesn\'t exist', function() {});
    it('gets 200 for similar page', function() {});
  });


  describe('GET /wiki/add', function() {
    it('gets 200', function() {});
  });


  describe('POST /wiki/add', function() {
    it('creates in db', function() {});
  });

});