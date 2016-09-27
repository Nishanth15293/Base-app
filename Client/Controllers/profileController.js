(function(){
'use-strict';

angular.module('app').controller('profileController', profileController);
profileController.$inject = [
	'$http'
];

function profileController($http){
	var self = this;

	$http.get('http://localhost:3000/profile')
	.success(function(profile){
		$scope.profile = profile;
	})
	.error(function(err){
		alert(err.message);
	})
}

})();