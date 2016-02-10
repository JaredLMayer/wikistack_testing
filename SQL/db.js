var sqlite3 = require('sqlite3');
var path = require('path');
var chalk = require('chalk');
var _db;
module.exports = {
  connect: function(cb){
    var filePath = path.join(__dirname, 'imdb.db');
    new sqlite3.Database(filePath, function(_err){
      _db = this;
      cb(_err, this);
    });
  },
  query : function(sql, params, cb){
    _db.all(sql, params, function(err, results){
      if(results){
        console.log('**** results ****');
        console.log(results);
        console.log('**** results ****');
      }
      else
        console.log(chalk.red(err));

      cb(err, results);
    
    });
  },
  movieMapGenres(cb){
      var qry = `
        SELECT genre as name, count(*) as count 
        FROM movies
        JOIN movies_genres
        ON movies_genres.movie_id = movies.id
        GROUP BY genre
        ORDER BY count DESC
        `;
      return this.query(qry, [], cb);
  },
  movieMapYears(cb){
      var qry = `
        SELECT year as name, count(*) as count
        FROM movies
        GROUP BY year
        ORDER BY count DESC
        `;
      return this.query(qry, [], cb);
  },
  moviesByYear(year, cb){
      var qry = `
        SELECT id, name, rank
        FROM movies
        WHERE year = ?
        ORDER BY movies.rank DESC
        LIMIT 500
        `;
      return this.query(qry, [year], cb);
  },
  moviesByGenre(genre, cb){
      var qry = `
        SELECT id, name, rank
        FROM movies
        JOIN (
            SELECT movie_id 
            FROM movies_genres
            WHERE genre = ?
        ) as movie_ids
        ON movie_ids.movie_id = movies.id
        ORDER BY movies.rank DESC
        LIMIT 500
        `;
      return this.query(qry, [genre], cb);
  }
};
