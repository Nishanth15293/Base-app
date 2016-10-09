(function(){

angular.module('app').controller('loginController', loginController);
loginController.$inject = [
	'$state',
	'$http',
	'authTokenFactory'
];

function loginController($state, $http, authTokenFactory){
    var loginCtrl = this;
	loginCtrl.login = login;

	function login() {
        var email = loginCtrl.email;
        var password = loginCtrl.password;

        var payload = {
            email: email,
            password: password
        };

        $http.post('/login', payload).then(function (res) {
            if(res.data.token){
                authTokenFactory.setToken(res.data.token);
            }
            $state.go(res.data.dataRedirect);
        });
    }	
}
})();