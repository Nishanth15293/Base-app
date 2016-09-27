(function(){
'use-strict';

angular.module('app').factory('authInterceptor', authInterceptor)

authInterceptor.$inject = [
	'authTokenFactory'
];

function authInterceptor(authTokenFactory){
	return{
		request: request,
		response: response
	}

	function request(config){
		var token = authTokenFactory.getToken();

		if(token)
			config.headers.Authorization = 'Bearer ' + token;

		return config;
	}

	function response(res){
		return res;
	}
}
})();