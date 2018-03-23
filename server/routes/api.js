var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    User.findOne({}, function(err, doc) {
        if (err) {
            return res.send('Error!');
        }
       
    });
    
    
    
    
// 
   
});

router.post('/', function(req, res, next) {

    var user = new User({
       user: 'user',
        password: 'super-secret',
        
    });
    user.save();
    res.redirect('/');
});

module.exports = router;