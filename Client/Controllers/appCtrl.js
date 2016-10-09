/**
 * Created by Nishanth on 8/31/2016.
 */
(function(){
angular.module('app').controller('signupController',signupController);

signupController.$inject = [
    '$state',
    '$http',
    '$scope',
    'authServiceFactory'
];
    function signupController( $state, $http, $scope, authServiceFactory) {
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
            authServiceFactory.signup('/signup', payload)
                .success(function(res){
                    console.log('Thanks for signing up ' + res.user.email + '!');
                })
                .error(function(res){
                    console.log('Something went wrong, Please try again!');
                })

        }
    }
})();