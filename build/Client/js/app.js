/**
 * Created by Nishanth on 8/30/2016.
 */

angular.module('app', ['ui.router']);


/**
 * Created by Nishanth on 8/30/2016.
 */

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: '/Client/Partials/home.html',
            controller: 'appController'
        })

        .state('about', {
            url: '/about',
            templateUrl:'/Client/Partials/about.html'
        })

        .state('signup', {
            url: '/signup',
            templateUrl:'/Client/Partials/signupTemplate.html',
            controller: 'appController',
            controllerAs:'appCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/Client/Partials/loginTemplate.html',
            controller: 'appController',
            controllerAs:'appCtrl'
        })

        .state('dashboard', {
            url:'/dashboard',
            template:'<div><h1>Dashboard!!</h1></div>'
        })
}]);
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
                if(res.body.token){
                    localstorage.setItem(token, token);
                }
                $state.go(Dashboard);
            });
        }

    }
})();
/**
 * Created by Nishanth on 8/30/2016.
 */

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
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('/Client/Partials/about.html','<div class=container-fluid><h1>About page</h1></div>');
$templateCache.put('/Client/Partials/home.html','<div class="jumbotron text-center"><h1>Welcome Home {{hello}}!</h1><input type=text ng-model=hello ng-change=printChange()> <button class="btn btn-primary" ui-sref=about>About</button> <button class="btn btn-success" ui-sref=signup>Sign-up!</button> <button class="btn btn-success" ui-sref=login>Log-in!</button></div>');
$templateCache.put('/Client/Partials/loginTemplate.html','<div class=container><form class=form-signin><h2 class=form-signin-heading>Please Login IN</h2><label for=inputEmail class=sr-only>Email address</label> <input type=email id=inputEmail class=form-control placeholder="Email address" ng-model=appCtrlVm.email required autofocus> <label for=inputPassword class=sr-only ng-model=appCtrlVm.password>Password</label> <input type=password id=inputPassword class=form-control placeholder=Password required><div class=checkbox><label><input type=checkbox value=remember-me> Remember me</label></div><button class="btn btn-lg btn-primary btn-block" type=submit ng-click=appCtrlVm.login()>Login Me In!</button></form></div>');
$templateCache.put('/Client/Partials/signupTemplate.html','<div class=container><form class=form-signin><h2 class="form-signin-heading text-muted">Sign Up!</h2><label for=inputFirstName class=sr-only>First Name</label> <input type=text id=inputFirstName class=form-control placeholder="First Name" ng-model=appCtrl.firstName required autofocus> <label for=inputLastName class=sr-only>Last Name</label> <input type=text id=inputLastName class=form-control placeholder="Last Name" ng-model=appCtrl.lastName autofocus> <label for=inputEmail class=sr-only>Email address</label> <input type=email id=inputEmail class=form-control placeholder="Email address" ng-model=appCtrl.email required autofocus> <label for=inputPassword class=sr-only>Password</label> <input type=password id=inputPassword class=form-control placeholder=Password ng-model=appCtrl.password required> <input type=password id=confirmPassword class=form-control placeholder="Confirm Password" required> <button class="btn btn-lg btn-primary btn-block" type=submit ng-click=appCtrl.signup()>Sign Up</button></form></div>');}]);
/**
 * Created by Nishanth on 9/11/2016.
 */

//# sourceMappingURL=app.js.map
