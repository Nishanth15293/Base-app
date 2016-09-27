(function(){

angular.module('app').factory('authTokenFactory', authTokenFactory);

authTokenFactory.$inject = [
	'$window'
];

function authTokenFactory($window){
	var storage = $window.localStorage;
    var cachedToken;
    var authTokenFactory = {
        setToken : setToken,
        getToken : getToken,
        isAuthenticated : isAuthenticated,
        removeToken: removeToken
    }

    return authTokenFactory;

    function setToken(token){
        console.log('setting token' + token);
        cachedToken = token;
        $window.localStorage.setItem('userToken',token);
    }

    function getToken(){
        if(!cachedToken)
            cachedToken = localStorage.getItem('userToken');

        return cachedToken;
    }

    function isAuthenticated(){
        return !!authTokenFactory.getToken();
    }

    function removeToken(){
        cachedToken = null;
        localStorage.removeItem('userToken');
    }
}

})();