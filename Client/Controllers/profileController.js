(function(){
'use-strict';

angular.module('app').controller('profileController', profileController);
profileController.$inject = [
	'$http',
	'$window'
];

function profileController($http, $window){
	var profileCtrl = this;
	var currentUser = JSON.parse($window.localStorage.getItem('current_user'));
	profileCtrl.firstName = currentUser.firstName;
	profileCtrl.lastName = currentUser.lastName;
	profileCtrl.email = currentUser.email || currentUser.gmail;
	profileCtrl.imageUrl = currentUser.imageUrl || currentUser.googleImageUrl;
	// $http.get('http://localhost:3000/profile')
	// .success(function(profile){
	// 	$scope.profile = profile;
	// })
	// .error(function(err){
	// 	alert(err.message);
	// })


}

})();