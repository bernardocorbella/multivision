var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
  "use strict";
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, "Connection Error..."));
  db.once('open', function callback() {
      console.log('MultiVision db connection opened');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String,
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };
  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'admin');
      User.create({firstName: 'Admin', lastName: 'Of MultiVision', username: 'admin', salt: salt, hashed_pwd: hash});
      salt = createSalt();
      hash = hashPwd(salt, 'ber');
      User.create({firstName: 'Bernardo', lastName: 'Corbella', username: 'ber', salt: salt, hashed_pwd: hash});
      salt = createSalt();
      hash = hashPwd(salt, 'john');
      User.create({firstName: 'John', lastName: 'Doe', username: 'john', salt: salt, hashed_pwd: hash});
    };
  });
}

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);

  return hmac.update(pwd).digest('hex');
}
