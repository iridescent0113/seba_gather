require('angular')
.module('gather')
.controller('registerController', ['$scope', '$http', function($scope, $http) {

	function checkPasswords(pw, pwRepeat) {
		return pw === pwRepeat;
	};

	$scope.register = function() {
		if(!checkPasswords($scope.credentials.password, $scope.credentials.passwordRepeat)) {
			return;
		}
		$http({
			method : 'POST',
			url : '/register',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				username : $scope.credentials.username,
				password : $scope.credentials.password
			}
		}).then(function(response) {
			$scope.test = 'register success';
		}, function(response) {
			$scope.test = 'register failure';
		});
	};

}]);
