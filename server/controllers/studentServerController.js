/* Dependencies */
var mongoose = require('mongoose'), 
    Student = require('../models/StudentSchema.js');

/* Create a student */
exports.create = function(req, res) {

    /* Instantiate a Student */
    var student = new Student(req.body);

    /* Then save the student */
    student.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(student);
        }
    });
};

/* Show the current student */
exports.read = function(req, res) {
    /* send back the student as json from the request */
    res.json(req.student);
};

/* Update a student */
exports.update = function(req, res) {
    var student = req.student;

    /* Replace the article's properties with the new properties found in req.body */
    student.name = req.body.name;
    student.id = req.body.id;
    student.medical = req.body.medical;
    student.social = req.body.social;
    student.general = req.body.general;
    student.email = req.body.email;
    student.committee = req.body.committee;

    /* Save the article */
    student.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(student);
        }
    });
};

/* Delete a student */
exports.delete = function(req, res) {
    var student = req.student;

    /* Remove the article */
    student.remove(function(err) {
        if(err) {
        console.log(err);
        res.status(400).send(err);
        } else {
            res.end();
        }
    })
};

/* Retreive all the directory students, sorted alphabetically by student name */
exports.list = function(req, res) {
    Student.find({}, function(err, students) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(students);
        }
    }).sort({name:1});
};

/* Middleware: find a student by its ID, then pass it to the next request handler. */
exports.studentByID = function(req, res, next, id) {
    Student.findById(id).exec(function(err, student) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.student = student;
            next();
        }
    });
};