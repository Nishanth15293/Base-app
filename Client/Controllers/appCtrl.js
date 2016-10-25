/**
 * Created by Nishanth on 8/31/2016.
 */
(function(){
angular.module('app').controller('signupController',signupController);

signupController.$inject = [
    '$state',
    '$http',
    '$scope',
    '$auth',
    '$window'
];
    function signupController( $state, $http, $scope, $auth, $window) {
        var signupCtrl = this;
        signupCtrl.signup = signup;

        function signup() {
            var firstName = signupCtrl.firstName;
            var lastName = signupCtrl.lastName;
            var email = signupCtrl.email;
            var password = signupCtrl.password;

            var payload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            // $http.post('/signup', payload).then(function (res) {
            //     authTokenFactory.setToken(res.data.token);
            //     $state.go(res.data.dataRedirect);
            // });
            $auth.signup(payload)
                .then(function(res){
                    console.log('Thanks for signing up ' + res.data.user.email + '!');
                    $auth.setToken(res.data.token);
                    $window.localStorage.setItem('current_user', JSON.stringify(res.data.user));
                    $state.go('dashboard');
                })
                .catch(function(res){
                    console.log('Something went wrong, Please try again!');
                })

        }
    }
})();