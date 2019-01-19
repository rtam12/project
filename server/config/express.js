var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    studentRouter = require('../routes/studentRoutes.js');

module.exports.init = function() {
    //connect to database
    mongoose.connect(config.db.uri);

    //initialize app
    var app = express();

    //enable request logging for development debugging
    app.use(morgan('dev'));

    //body parsing middleware 
    app.use(bodyParser.json());

    //Serve static files
    app.use('/', express.static(__dirname + '/../../client'));

    //Use the student router for requests to the api
    app.use('/api/students', studentRouter);

    //Go to homepage for all routes not specified
    app.use('/*', express.static(__dirname + '/../../client/index.html'));

    return app;
};  