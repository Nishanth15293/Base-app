(function(){

angular.module('app').controller('loginController', loginController);
loginController.$inject = [
	'$state',
	'$http',
	'$auth',
	'authServiceFactory'
];

function loginController($state, $http, $auth, authServiceFactory){
    var loginCtrl = this;
	loginCtrl.login = login;
	loginCtrl.authenticate = authenticate;

	function login() {
        var email = loginCtrl.email;
        var password = loginCtrl.password;

        var payload = {
            email: email,
            password: password
        };

        $auth.login(payload)
        		.then(function(res){
        			console.log('Thanks for coming back ' + res.data.user.email + '!');
    				$state.go('dashboard');

        		})
        		.catch(function(res){
        			console.log('Something went wrong, Please try again!');
        		})
    }	

    function authenticate(provider) {
    	$auth.authenticate('google').then(function(res){
    		console.log('Thanks for signing in' + res.data.user.displayName + '!');
    		$state.go('dashboard');
    	}, function(err){
    		console.log('Something went wrong, Please try again!');
    	});
    }
}
})();