(function(){

angular.module('app').factory('authServiceFactory', authServiceFactory);

authServiceFactory.$inject = [
	'$http',
    '$state',
    'authTokenFactory'
];

function authServiceFactory($http, $state, authTokenFactory){
	var service = {
		login : loginHandler,
		signup : signupHandler
	};

	return service;

	function loginHandler(url, cred) {
            return $http.post(url, cred).success(authSuccessful);
        }

    function signupHandler(url,cred) {
        return $http.post(url,cred).success(authSuccessful);
    }

    function authSuccessful(res){
        authTokenFactory.setToken(res.token);
        $state.go('dashboard');
    }
}

})();