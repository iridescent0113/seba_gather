require('angular')
.module('gather')
.factory('authorizationInterceptor', ['authorizationService',
	function(authorizationService) {
	
		function req(config) {
			if(authorizationService.isAuthorized()) {
				var token = authorizationService.getToken();
				config.headers.Authorization = 'JWT ' + token;
			}
			return config;
		}

		function res(res) {
			if(res && res.data.token) {
				authorizationService.saveToken(res.data.token);
			}
			return res;
		}

		return {
			request : req,
			response : res
		};
}]);
