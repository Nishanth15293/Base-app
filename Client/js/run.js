/**
 * Created by Nishanth on 8/30/2016.
 */
angular.module('app').run(['$state', '$window' ,function($state, $window){
    $state.go('home');
    console.log("entered Run");
    var params  = $window.location.search.substring(1);
    console.log(params);

    if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
    	var pair = params.split('=');
    	var code = decodeURIComponent(pair[1]);

    	$window.opener.postMessage(code, window.location.origin);
    }
}]);