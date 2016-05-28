require('angular')
.module('gather')
.controller('loginController', ['$scope', '$http', function($scope, $http) {

	$scope.test = 'Hello From LoginController';

	$scope.login = function() {
		console.log($scope.credentialsForm);
		console.log($scope.credentials);
		$http({
			method : 'POST',
			url : '/login',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				username : $scope.credentials.username,
				password : $scope.credentials.password
			}
		}).then(function(response) {
			$scope.test = 'login success';
		}, function(response) {
			$scope.test = 'login failure';
		});
	};

}]);
