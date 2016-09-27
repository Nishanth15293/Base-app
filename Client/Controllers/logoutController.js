(function(){
'use-strict';

angular.module('app').controller('logoutController', logoutController);

logoutController.$inject = [
	'authTokenFactory',
	'$state'
];

function logoutController(authTokenFactory, $state){
	authTokenFactory.removeToken();
	$state.go('home');
}
})();