angular.module('students', []).factory('Students', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/students');
    },
	
    create: function(student) {
      return $http.post('/api/students', student);
    },

    delete: function(id) {
      return $http.delete('/api/students/' + id);
    }
  };

  return methods;
});
