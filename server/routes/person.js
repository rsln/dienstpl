var express = require('express');
var router = express.Router();
var Person = require('../../models/person');

router.get('/', function (req, res, next) {
    Person.find()
            .exec(function (err, personen) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Success',
                    obj: personen
                });
            });

});

router.get('/:id', function (req, res, next) {
    Person.findById(req.params.id, function (err, person) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!person) {
            return res.status(500).json({
                title: 'No Person Found!',
                error: {message: 'Person not found'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: person
        });
    });

});

router.post('/', function (req, res, next) {
    var person = new Person(req.body);
    person.save(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved person',
            obj: result
        });
    });

});

router.patch('/:id', function (req, res, next) {
    Person.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, person) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!person) {
            return res.status(500).json({
                title: 'No Person Found!',
                error: {message: 'Person not found'}
            });
        }
        res.status(201).json({
            message: 'Updated person',
            obj: person
        });
    });
});

router.delete('/:id', function (req, res, next) {
    Person.findById(req.params.id, function (err, person) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!person) {
            return res.status(500).json({
                title: 'No Person Found!',
                error: {message: 'Person not found'}
            });
        }
        person.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;