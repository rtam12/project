angular.module('students').controller('StudentsController', ['$scope', 'Students', function($scope, Students) {
    /* Get all the students, then bind it to the scope */
    Students.getAll().then(function(response) {
        $scope.students = response.data;
    }, function(error) {
        console.log('Unable to retrieve students:', error);
    });

    $scope.detailedInfo = undefined;

    /* Save the article using the Students factory. If the object is successfully 
      saved redirect back to the list page. Otherwise, display the error */
    $scope.addStudent = function() {
        Students.create($scope.newStudent).then(function(response) {
            $scope.students.push($scope.newStudent);
            $state.go('student.list');
        }, function(error) {
            console.log('Unable to create student:', error);
        });
    };

    /* Delete the article using the Students factory. If the removal is successful, 
      navigate back to 'student.list'. Otherwise, display the error. */
    $scope.deleteStudent = function(index) {
        Students.delete($scope.students[index]._id).then(function(response) {
            $scope.students.splice(index, 1);
            $state.go('student.list');
        }, function(error) {
            console.log('Unable to delete student:', error);
        });
    };

    $scope.showDetails = function(index) {
        $scope.detailedInfo = $scope.students[index];
    };
}]);