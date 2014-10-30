var express = require('express');
var router = express.Router();

// connect to mongodb

// print all tasks to console


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
console.log('Connection to MongoDB');

var TaskModel = mongoose.model('Task', {
    description: String,
    status: Number,
    priority: Number,
    tags: String,
    notes: String
});

var task1 = new TaskModel({
    description: 'Learn Android',
    status: 1,
    priority: 1,
    tags: 'Android, Samsung',
    notes: 'Hackathon'
});

//task1.save(function(err, results){
//    console.log(err);
//    console.log(results);
//});



router.get('/', function(req, res){ // req.query.
    TaskModel.find({priority: req.query.priority, status: req.query.status},function(err, results){
        if (err) {
            res.status(500).json({details: results});
        }
        else {
            res.status(200).json(results);
        }

    });
});




module.exports = router;
