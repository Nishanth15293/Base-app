(function(){
'use-strict';
angular.module('app').controller('dashboardController', dashboardController);

dashboardController.$inject = ['$scope'];

function dashboardController($scope){
 var self = this;
 this.message = 'Welcome to You Dashboard';
}

})();