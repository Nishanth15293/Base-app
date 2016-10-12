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
	var service = {
		login : loginHandler,
		signup : signupHandler,
        googleAuth : googleAuthHandler
	};

	return service;

    function authSuccessful(res){
        authTokenFactory.setToken(res.token);
        $state.go('dashboard');
    }

    function loginHandler(url, cred) {
            return $http.post(url, cred).success(authSuccessful);
        }

    function signupHandler(url,cred) {
        return $http.post(url,cred).success(authSuccessful);
    }


    function googleAuthHandler() {
        
        var clientId = '299585083072-vt5ot91ldob4fnnjpfjnke4vgrisd3bp.apps.googleusercontent.com';
        var urlBuilder = [];
            urlBuilder.push('response_type=code',
                'client_id=' + clientId,
                'redirect_uri=' + window.location.origin,
                'scope=profile email'
            )

        var url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlBuilder.join('&');
        var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 +",top=" + ($window.outeHeight -500 ) /2.5;
        
        var deferred = $q.defer();
        var popup = $window.open(url, "", options);
        $window.focus();

        $window.addEventListener('message', function(event){
            if(event.origin === $window.location.origin){
                var code = event.data;
                popup.close();

                $http.post('auth/google', {
                    code : code,
                    clientId : clientId,
                    redirectUri: $window.location.origin
                }).success(function(jwt){
                    authSuccessful(jwt);
                    deferred.resolve(jwt);
                });
                    
            }
        })

        return deferred.promise;
    }
}

})();