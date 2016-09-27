(function(){

angular.module('app').factory('authServiceFactory', authServiceFactory);

authServiceFactory.$inject = [
	'$q',
	'$http',
	'$rootScope'
];

function authServiceFactory($q, $http, $rootScope){
	var service = {
		login : loginHandler,
		logout : logoutHandler
	};

	return service;

	function loginHandler(url, cred) {
            return $http.post(url, cred).then(function (response) {
                if (response.data.error) {
                    return response.data;
                }
                else {
                    
                    return 'success';
                }
            });
        }

    function logoutHandler() {
        
    }
}

})();