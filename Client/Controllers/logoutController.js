(function(){
'use-strict';

angular.module('app').controller('logoutController', logoutController);

logoutController.$inject = [
	'$auth',
	'$state',
	'$window'
];

function logoutController($auth, $state, $window){
	$auth.logout();
	$window.localStorage.removeItem('current_user');
	$state.go('login');
}
})();