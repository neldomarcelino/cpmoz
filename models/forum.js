module.exports = function(app){
    var mongoose = require('mongoose');
    var database = app.get('database');

    var forum = new mongoose.Schema(
        {
            title: {type: String, required: true, createIndexes:{unique: true}},
            introdution: {type: String},
            autor: String,
            data: {type: Date, default: Date.now},
            visualization: {type: Number, default: 0}
        }
    ); 
    
    return database.model('forum', forum);
}