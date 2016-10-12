(function(){
'use-strict';

angular.module('app').controller('logoutController', logoutController);

logoutController.$inject = [
	'$auth',
	'$state'
];

function logoutController($auth, $state){
	$auth.logout();
	$state.go('login');
}
})();