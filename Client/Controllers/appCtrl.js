/**
 * Created by Nishanth on 8/31/2016.
 */
(function(){
angular.module('app').controller('appController',appCtrlFunction);
    function appCtrlFunction( $state, $http) {
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
            console.log(payload);

            $http.post('/signup', payload).then(function (res) {
                console.log(res);
                $state.go(res.data.dataRedirect);
            });

        }

         function login () {
            var email = appCtrl.email;
            var password = appCtrl.password;

            var payload = {
                email: email,
                password: password
            };

            $http.post('/login', payload).then(function (res) {
                console.log(res.data);
                if(res.body.token){
                    localstorage.setItem(token, token);
                }
                $state.go(Dashboard);
            });
        }

    }
})();