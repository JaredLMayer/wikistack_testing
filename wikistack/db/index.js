var Promise = require('bluebird');
var mongoose = require('mongoose');

var statuses = ['open', 'closed'];

var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true, unique: true},
  urlTitle: {type: String, required: true, unique: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: statuses, required: true, default: 'open'},
  date:     {type: Date, default: Date.now },
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags: [String]
});

pageSchema.methods.findSimilar = function(){
  return Page.find({
    tags: {$in: this.tags},
    _id: {$ne: this.id }
  }).populate('author');

};

var marked = require('marked');
pageSchema.virtual('renderedContent').get(function(){
  return marked(this.content);
});

pageSchema.pre('validate', function(next){
  this.urlTitle = this.title.replace(/[^a-zA-Z0-9]/g, '_');
  next();
});

pageSchema.virtual('route').get(function(){
  return `/wiki/${this.urlTitle}`;
});

pageSchema.virtual('similarRoute').get(function(){
  return `/wiki/similar/${this.urlTitle}`;
});

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});



var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);


var _connection;
module.exports = {
  disconnect: function(){
    return new Promise(function(resolve, reject){
      mongoose.disconnect(function(){
        resolve();
      });
    });
  },
  connect: function(){
    if(_connection)
      return _connection;
    _connection =  new Promise(function(resolve, reject){
      mongoose.connect('mongodb://localhost/wikistack1601', function(err){
          if(err)
            return reject(err);
          resolve(mongoose.connection);
      });
    
    });
    return _connection;
  },
  models: {
    Page: Page,
    User: User
  }
};
