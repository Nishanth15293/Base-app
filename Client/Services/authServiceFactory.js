(function(){

angular.module('app').factory('authServiceFactory', authServiceFactory);

authServiceFactory.$inject = [
	'$http',
    '$state',
    '$window',
    '$q',
    'authTokenFactory'
];

function authServiceFactory($http, $state, $window, $q, authTokenFactory){
	// var service = {
	// 	login : loginHandler,
	// 	signup : signupHandler
	// };

	// return service;

 //    function authSuccessful(res){
 //        authTokenFactory.setToken(res.token);
 //        $state.go('dashboard');
 //    }

 //    function loginHandler(url, cred) {
 //            return $http.post(url, cred).success(authSuccessful);
 //        }

 //    function signupHandler(url,cred) {
 //        return $http.post(url,cred).success(authSuccessful);
 //    }

}

})();