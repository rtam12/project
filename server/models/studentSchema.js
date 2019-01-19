/* Import mongoose and all necessary variable definitions needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Schema definition */
var studentSchema = new Schema({
  name: {type: String, required: true},
  id: {type: Number, required: true, unique: true},
  points: {
  	medical: {type: Number, 'default': 0},
  	social: {type: Number, 'default': 0},
    general: {type: Number, 'default': 0},
    penalty: {type: Number, 'default': 0}
  },
  email: {type: String, unique: true},
  committee: {type: String}
});

/* A 'pre' function that adds the updated_at (and created_at if not already there) property */
studentSchema.pre('save', function(next) {
  /* Get the current date */
  var currentDate = new Date();

  /* Change the updated_At field to the current date */
  this.updated_At = currentDate;

  /* If created_At doesn't exist, add to that field */
  if (!this.created_At)
  	this.created_At = currentDate;

  next();
});

/* Use the schema to instantiate a Mongoose model */
var Student = mongoose.model('Student', studentSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Student;