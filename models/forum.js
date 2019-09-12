module.exports = function(app){
    var mongoose = require('mongoose');
    var database = app.get('database');

    var forum = new mongoose.Schema(
        {
            title: {type: String, required: true, unique: true},
            introdution: {type: String},
            autor: String,
            data: {type: Date, default: Date.now}
        }
    ); 
    
    return database.model('forum', forum);
}