(function(){
'use-strict';

angular.module('app').directive('appHeader', appHeader);

function appHeader(){
	var directive ={
		restrict : 'CAE',
		scope:{
			eventHandler: '&ngClick'
		},
		bindToController: true,
		controller: headerController,
		controllerAs: 'headerCtrl',
		templateUrl: '/Client/Partials/header.html'
	};

	function link(scope, elem, attrs){}
	return directive;
}
// app.module('app').controller('headerController', headerController);
headerController.$inject =['$auth', '$window'];

function headerController($auth, $window){
	var headerCtrl = this;
	headerCtrl.isAuthenticated = $auth.isAuthenticated;
	if(headerCtrl.isAuthenticated){
		var currentUser = JSON.parse($window.localStorage.getItem('current_user'));
		console.log(currentUser);
		if(currentUser){
			headerCtrl.userName = currentUser.firstName;
			headerCtrl.userImageUrl = currentUser.imageUrl || currentUser.googleImageUrl;
		}
	}
}

})();