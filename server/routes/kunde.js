var express = require('express');
var router = express.Router();
var Kunde = require('../../models/kunde');

router.get('/', function (req, res, next) {
    Kunde.find()
            .exec(function (err, kunden) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Success',
                    obj: kunden
                });
            });

});

router.get('/:id', function (req, res, next) {
    Kunde.findById(req.params.id, function (err, kunde) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!kunde) {
            return res.status(500).json({
                title: 'No Kunde Found!',
                error: {message: 'Kunde not found'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: kunde
        });
    });

});

//Neue Kunde erstellen
router.post('/', function (req, res, next) {
    var kunde = new Kunde(req.body);
    kunde.save(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved kunde',
            obj: result
        });
    });

});

//Objekt über ID finden und Updaten
router.patch('/:id', function (req, res, next) {
    Kunde.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, kunde) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!kunde) {
            return res.status(500).json({
                title: 'No Kunde Found!',
                error: {message: 'Kunde not found'}
            });
        }
        res.status(201).json({
            message: 'Updated kunde',
            obj: kunde
        });
    });
});

router.delete('/:id', function (req, res, next) {
    Kunde.findById(req.params.id, function (err, kunde) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!kunde) {
            return res.status(500).json({
                title: 'No Kunde Found!',
                error: {message: 'Kunde not found'}
            });
        }
        kunde.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted kunde',
                obj: result
            });
        });
    });
});

module.exports = router;