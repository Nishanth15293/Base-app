/**
 * Created by Nishanth on 8/31/2016.
 */
(function(){
angular.module('app').controller('appController',appCtrlFunction);
    function appCtrlFunction( $state, $http, $scope, authTokenFactory) {
        console.log('in controller!');
        var appCtrl = this;
        appCtrl.signup = signup;
        appCtrl.login = login;

        function signup() {
            var firstName = appCtrl.firstName;
            var lastName = appCtrl.lastName;
            var email = appCtrl.email;
            var password = appCtrl.password;

            var payload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            $http.post('/signup', payload).then(function (res) {
                authTokenFactory.setToken(res.data.token);
                $state.go(res.data.dataRedirect);
            });
        }

        function login() {
            var email = appCtrl.email;
            var password = appCtrl.password;

            var payload = {
                email: email,
                password: password
            };

            $http.post('/login', payload).then(function (res) {
                if(res.data.token){
                    authTokenFactory.setToken(res.data.token);
                }
                $state.go(res.data.dataRedirect);
            });
        }
    }
})();