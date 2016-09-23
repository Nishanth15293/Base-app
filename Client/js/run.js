/**
 * Created by Nishanth on 8/30/2016.
 */
angular.module('app').run(['$state',function($state){
    $state.go('home');
    console.log("entered Run");
    //$rootScope.hello = "akckldcmlsdkv";
    //$rootScope.printChange = function() {
    //    console.log($rootScope.hello);
    //}
}]);