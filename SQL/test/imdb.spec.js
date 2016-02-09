var expect = require('chai').expect;
var db = require('../db');
var chalk = require('chalk');

describe('imdb queries', function(){
  var conn;

  before(function(done){
    db.connect(function(_err, _conn){
      conn = _conn;
      conn.on('profile', function(sql, time){
        console.log(chalk.blue(sql));
        console.log(chalk.magenta(time/1000 + ' seconds'));
      });
      done();
    });
  });

  it('can connect to the database', function(){
    expect(conn).to.be.ok;
  });

  var results;

  function generateResults(qry, params, done){
      db.query(qry, params, function(_err, _results){
        results = _results;
        done();
      });
  }

  describe('counting movies', function(){
    beforeEach(function(done){
      var qry = `
        SELECT count(*) as count 
        FROM movies
        `;
      generateResults(qry, [], done);
    });
    it('there are movies', function(){
      expect(results[0].count).to.be.eq(388269);
    });
  });

  describe('counting actors', function(){
    beforeEach(function(done){
      var qry = `
        SELECT count(*) as count 
        FROM actors
        `;
      generateResults(qry, [], done);
    });
    it('there are actors', function(){
      expect(results[0].count).to.be.eq(817718);
    });
  });

  describe('car', function(){
    beforeEach(function(done){
      var qry = `
        SELECT name
        FROM movies
        WHERE movies.name like ?
        `;
      generateResults(qry, ['%car%'], done);
    });
    it('many movies with the letters car', function(){
      expect(results.length).to.be.eq(3732);
    });
  });

  describe('1982', function(){
    beforeEach(function(done){
      var qry = `
        SELECT count(*) as count
        FROM movies
        WHERE year = ?
        `;
      generateResults(qry, [1982], done);
    });
    it('there are many movie from 1982', function(){
      expect(results[0].count).to.be.eq(4597);
    });
  });

  describe('stacktors', function(){
    beforeEach(function(done){
      var qry = `
        SELECT actors.first_name, actors.last_name
        FROM actors
        WHERE actors.last_name like '%stack%'
        `;
      generateResults(qry, [], done);
    });
    it('there are 47 stacktors', function(){
      expect(results.length).to.be.eq(47);
    });
  });

  describe('famename first', function(){
    beforeEach(function(done){
      var qry = `
        SELECT actors.first_name, count(*) as count
        FROM actors
        GROUP BY actors.first_name
        ORDER BY count(*) DESC
        LIMIT 10
        `;
      generateResults(qry, [], done);
    });
    it('the most popular first name is John', function(){
      expect(results[0].first_name).to.be.eq('John');
    });
  });

  describe('famename last', function(){
    beforeEach(function(done){
      var qry = `
        SELECT actors.last_name, count(*) as count
        FROM actors
        GROUP BY actors.last_name
        ORDER BY count(*) DESC
        LIMIT 10
        `;
      generateResults(qry, [], done);
    });
    it('the most popular last name is Smith', function(){
      expect(results[0].last_name).to.be.eq('Smith');
    });
  });

  describe('prolific', function(){
    beforeEach(function(done){
      this.timeout(3000);
      var qry = `
        SELECT actors.first_name, actors.last_name, prolific_actors.count
        FROM actors
        JOIN
        (
          SELECT actor_id, count(*) as count
          FROM roles
          GROUP BY roles.actor_id
          ORDER BY count DESC
          LIMIT 10
        ) as prolific_actors
        ON prolific_actors.actor_id = actors.id
        `;
      generateResults(qry, [], done);
    });
    it('the most prolific is Mel Blanc', function(){
      expect(results[0].last_name).to.be.eq('Blanc');
    });
  });

  describe('bottom of barrel', function(){
    beforeEach(function(done){
      var qry = `
        SELECT genre, count(*) as count
        FROM movies_genres
        GROUP BY genre
        ORDER BY count(*)
        LIMIT 10
        `;
      generateResults(qry, [], done);
    });
    it('Film-Noir is the least popular', function(){
      expect(results[0].genre).to.be.eq('Film-Noir');
    });
  });

  describe('braveheart in 1995', function(){
    beforeEach(function(done){
      var qry = `
        SELECT actors.first_name, actors.last_name
        FROM actors
        JOIN roles on roles.actor_id = actors.id
        JOIN movies on roles.movie_id = movies.id
        WHERE movies.name = ? AND movies.year = ?
        ORDER BY actors.last_name
        `;
      generateResults(qry, ['Braveheart', 1995], done);
    });
    it('first cast member is Alun', function(){
      expect(results[0].first_name).to.be.eq('Alun');
    });
  });

  describe('leap noir', function(){
    beforeEach(function(done){
      var qry = `
        SELECT directors.first_name, directors.last_name, movies.name, movies.year
        FROM movies
        JOIN movies_genres ON movies.id = movies_genres.movie_id
        JOIN movies_directors ON movies_directors.movie_id = movies.id
        JOIN directors ON directors.id = movies_directors.director_id
        WHERE movies.year % 4 = 0 and movies_genres.genre = ?
        `;
      generateResults(qry, ['Film-Noir'], done);
    });
    it('first movie is Act of Violence', function(){
      expect(results[0].name).to.be.eq('Act of Violence');
    });
  });

  describe('bacon', function(){
    beforeEach(function(done){
      this.timeout(20000);
      var qry = `
        SELECT first_name, last_name, kevins_movies.name as name
        FROM roles
        JOIN
        (SELECT movies.id as id, movies.name as name
        FROM movies
        JOIN roles ON movies.id = roles.movie_id
        JOIN actors ON actors.id = roles.actor_id
        JOIN movies_genres ON movies_genres.movie_id = movies.id
        WHERE actors.first_name = 'Kevin' and actors.last_name = 'Bacon' and movies_genres.genre = 'Drama') as kevins_movies
        ON kevins_movies.id = roles.movie_id
        JOIN actors ON actors.id = roles.actor_id
        `;
      generateResults(qry, [], done);
    });
    it('first cast mate is Allen', function(){
      expect(results[0].last_name).to.be.eq('Allen');
    });
    it('first movie is Apollo 13', function(){
      expect(results[0].name).to.be.eq('Apollo 13');
    });
  });
  describe('longevityActors', function(){
    beforeEach(function(done){
      this.timeout(5000);
      var qry = `
        SELECT actors.first_name as first_name, actors.last_name as last_name
        FROM actors
        JOIN
        (
          select after_2000.actor_id
          FROM
          (
           SELECT distinct actor_id
           FROM roles
           WHERE movie_id in (SELECT id FROM movies WHERE year > 2000)
          ) after_2000
          JOIN
          (
           SELECT distinct actor_id
           FROM roles
           WHERE movie_id in (SELECT id FROM movies WHERE year < 1900)
          ) before_1900
          ON after_2000.actor_id = before_1900.actor_id
        ) as long_actors
        ON long_actors.actor_id = actors.id
        `;
      generateResults(qry, [], done);
    });

    it('one of the actors is Kofi', function(){
      var names = results.map(function(result){
        return result.first_name;
      });
      expect(names).contains('Kofi');
    });
  });

  describe('movieCountsByYear', function(){
    beforeEach(function(done){
      this.timeout(5000);
      var qry = `
        SELECT count(*) as count, year
        FROM movies
        GROUP BY year
        ORDER BY year DESC
        `;
      generateResults(qry, [], done);
    });

    it('there are 5000 movies from 2000', function(){
      var movies = results.filter(function(result){
        return result.year == 2000;
      })[0];
      expect(movies.count).eq(11643);;
    });
  });
  


});
