module.exports = function(app){
    var mongoose = require('mongoose');
    var database = app.get('database');
    var user = new mongoose.Schema(
        {
            name: {type: String, required: true},
            email: {type: String, required: true, createIndexes:{unique: true}},
            contact: Number,
            password: String
        }
    );
    
    return database.model('user', user);
    
}