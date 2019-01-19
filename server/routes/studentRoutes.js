/* Dependencies */
var student = require('../controllers/studentServerController.js'), 
    express = require('express'), 
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/')
  .get(student.list)
  .post(student.create);

router.route('/:studentId')
  .get(student.read)
  .put(student.update)
  .delete(student.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.

  Say we make an example request to '/student/566372f4d11de3498e2941c9'

  The request handler will first find the specific student using this 'studentById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this student to the request object.

  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific student (depending on the HTTP verb specified)
 */
router.param('studentId', student.studentByID);

module.exports = router;