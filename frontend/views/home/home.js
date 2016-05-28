require('angular')
.module('gather')
.controller('homeController', ['$scope', function($scope) {
	
	$scope.test = 'Hello from homeController';
}]);
