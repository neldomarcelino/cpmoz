module.exports = function(app){
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;
    var database = app.get('database');

    var ansewres = new mongoose.Schema(
        {
           autor: {type: String, required: true},
           ansewer: {type: String, required: true},
           data: {type: Date, default: Date.now},
           forum: {type: ObjectId, ref: 'forum'} 
        }
    );
    
    return database.model('ansewres', ansewres);
}