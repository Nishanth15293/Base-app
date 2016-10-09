(function(){

angular.module('app').controller('loginController', loginController);
loginController.$inject = [
	'$state',
	'$http',
	'authServiceFactory'
];

function loginController($state, $http, authServiceFactory){
    var loginCtrl = this;
	loginCtrl.login = login;

	function login() {
        var email = loginCtrl.email;
        var password = loginCtrl.password;

        var payload = {
            email: email,
            password: password
        };

        authServiceFactory.login('/login', payload)
        		.success(function(res){
        			console.log('Thanks for coming back ' + res.user.email + '!');
        		})
        		.error(function(res){
        			console.log('Something went wrong, Please try again!');
        		})
    }	
}
})();