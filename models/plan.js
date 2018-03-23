var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schicht = new Schema({

    name: {type: Number, required: true}, 
    startHrs: {type: String, required: true}, 
    startMins: {type: String, required: true}, 
    endHrs: {type: String, required: true}, 
    endMins: {type: String, required: true}
    
});

var arbeitstag = new Schema({
   
    tag: {type: Date, required: true},
    schicht:  schicht
    
});

var arbeitszeiten = new Schema({
    
    person: { type: Schema.Types.ObjectId, ref: 'Person' },
    arbeitstage: [arbeitstag] 

});

var plan = new Schema({
    
    month:  {type: Number, required: true}, 
    year: {type: Number, required: true}, 
    kunde: { type: Schema.Types.ObjectId, ref: 'Kunde' },
    arbeitszeiten: [arbeitszeiten],
    schichten: [schicht]
    
});

module.exports = mongoose.model('Plan', plan);