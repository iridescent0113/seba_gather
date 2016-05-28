require('angular')
.module('gather')
.factory('authorizationService', ['$window', function($window) {
	var authorizationService = {};

	authorizationService.saveToken = function(t) {
		$window.localStorage['jwtToken'] = t;
	};

	authorizationService.getToken = function() {
		return $window.localStorage['jwtToken'];
	};

	authorizationService.deleteToken= function() {
		$window.localStorage.removeItem('jwtToken');
	};

	authorizationService.parseJwt = function(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse($window.atob(base64));
	};

	authorizationService.isAuthorized = function() {
		var token = this.getToken();
		return !!token;
	};

	return authorizationService;
}]);
