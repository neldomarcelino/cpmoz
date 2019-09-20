module.exports = function(app){
    var mongoose = require("mongoose");
    var database = app.get('database');

    var programmer = new mongoose.Schema({
        idUser: {type: String, createIndexes: {unique: true}},
        dateIns: Date,
        birt: Date,
        about: {
            me: String,
            professional: String,
            tech: []
        }

    });

    return database.model('programmer', programmer);
}