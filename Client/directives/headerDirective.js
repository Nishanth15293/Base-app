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

headerController.$inject =['authTokenFactory']

function headerController(authTokenFactory){
	var self = this;
	self.isAuthenticated = authTokenFactory.isAuthenticated;
}

})();