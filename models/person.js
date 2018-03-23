var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({   
    name: {type: String, required: true},
    tel: {type: String, required: true},
    email: {type: String, required: true}, 
    adress: {type: String, required: true}, 
    plz: {type: Number, required: true},
    city: {type: String, required: true},
    imagePath: {type: String, required: false},  
    hours: {type: Number, required: true}
});

// schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Person', schema);