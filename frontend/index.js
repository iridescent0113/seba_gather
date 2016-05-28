require('./resources/css/index.css');

var angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-route');
require('angular-material');

angular.module('gather', ['ngAria', 'ngAnimate', 'ngRoute', 'ngMaterial'])
	.constant('BASEURL', 'http://localhost:8080')
	.config(['$mdThemingProvider', function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('orange')
			.accentPalette('blue');
	}])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : './views/home/home.html',
				controller : 'homeController'
			})
			.when('/gatherings', {
				templateUrl : './views/gatherings/gatherings.html',
				controller : 'gatheringsController'
			})
			.when('/teams', {
				templateUrl : './views/teams/teams.html',
				controller : 'teamsController'
			})
			.when('/login', {
				templateUrl : './views/login/login.html',
				controller : 'loginController'
			})
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('authorizationInterceptor');
	}]);

require('./mainController');
require('./views');
require('./components');
