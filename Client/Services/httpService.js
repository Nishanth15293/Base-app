/**
 * Created by Nishanth on 9/11/2016.
 */
(function(){
'use strict';


angular.module('app').factory('httpFactory', httpFactory);

httpFactory.$inject= [
	'$http',
	'$q'
];

function httpFactory($http, $q){
	var service = {
		get : getHandler,
		post : postHandler
	};

	return service;

	function postHandler(url, payload) {
            return $http.post(url, payload).then(function (response) {
                if (response.data.error) {
                    return response.data;
                }
                else {
                    
                    return response.data;
                }
            });
        }

    function getHandler(url) {
        return $http.get(url).then(function(response){ //can try .then().catch(errfn())
        	if (response.data.error) {
                return response.data;
            }
            else {
                return response.data;
            }
        });
    }
}

})();