var angular = require('angular');

angular.module('gather').controller('mainController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
	
	$scope.mainTest = 'Hallo von MainController';

	var originatorEvent;
	$scope.openMenu = function($mdOpenMenu, ev) {
		originatorEvent = ev;
		$mdOpenMenu(ev);
	};
}]);
