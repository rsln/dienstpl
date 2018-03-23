var express = require('express');
var router = express.Router();
var Plan = require('../../models/plan');
var opts =
        [
            {path: 'arbeitszeiten.person'},
            {path: 'kunde'}
        ]

router.get('/', function (req, res, next) {
    Plan.find()
            .populate('kunde')
            .populate('arbeitszeiten.person')
            .exec(function (err, plan) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Success',
                    obj: plan
                });
            });

});

router.get('/:id', function (req, res, next) {
    Plan.findById(req.params.id, function (err, plan) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!plan) {
            return res.status(500).json({
                title: 'No Plan Found!',
                error: {message: 'Plan not found'}
            });
        }
        Plan.populate(plan, opts, function (err, plan) {
            res.status(201).json({
                message: 'Success',
                obj: plan
            });
        });
    });

});

router.post('/', function (req, res, next) {
    var plan = new Plan(req.body);
    plan.save(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        Plan.populate(result, opts, function (err, plan) {
            res.status(201).json({
                message: 'Saved plan',
                obj: plan
            });
        });
    });

});

router.patch('/:id', function (req, res, next) {
    Plan.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, plan) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!plan) {
            return res.status(500).json({
                title: 'No Plan Found!',
                error: {message: 'Plan not found'}
            });
        }
        Plan.populate(plan, opts, function (err, updatedPlan) {
            res.status(201).json({
                message: 'Updated plan',
                obj: updatedPlan
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    Plan.findById(req.params.id, function (err, plan) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!plan) {
            return res.status(500).json({
                title: 'No Plan Found!',
                error: {message: 'Plan not found'}
            });
        }
        plan.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted plan',
                obj: result
            });
        });
    });
});

module.exports = router;