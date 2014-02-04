var mongoose = require('mongoose');

module.exports = function(config) {
    "use strict";
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "Connection Error..."));
    db.once('open', function callback() {
        console.log('MultiVision db connection opened');
    });
}