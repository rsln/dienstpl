var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firma: {type: String, required: true}, 
    ansprechspartner: {type: String, required: true}, 
    tel: {type: String, required: true}, 
    email: {type: String, required: true},
    adress: {type: String, required: true}, 
    plz: {type: Number, required: true}, 
    city: {type: String, required: true}
});

// schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Kunde', schema);