var mongoose = require('mongoose');

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
      userName: String,
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        User.create({firstName: 'Admin', lastName: 'Of MultiVision', userName: 'admin'});
      };
    });

}
