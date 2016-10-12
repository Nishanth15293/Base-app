/**
 * Created by Nishanth on 8/30/2016.
 */

angular.module('app', ['ui.router', 'ngAnimate']);


/**
 * Created by Nishanth on 8/30/2016.
 */

angular.module('app').config(config);

config.$inject = [
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider'
];

function config($httpProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: '/Client/Partials/home.html',
        })

        .state('profile', {
            url: "/profile",
            templateUrl: '/Client/Partials/profile.html',
            controller: 'profileController',
            controllerAs: 'profileCtrl'

        })

        .state('about', {
            url: '/about',
            templateUrl:'/Client/Partials/about.html'
        })

        .state('signup', {
            url: '/signup',
            templateUrl:'/Client/Partials/signupTemplate.html',
            controller: 'signupController',
            controllerAs:'signupCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/Client/Partials/loginTemplate.html',
            controller: 'loginController',
            controllerAs:'loginCtrl'
        })

        .state('logout', {
            url:'/logout',
            controller: 'logoutController',
            controllerAs: 'logoutCtrl'
        })

        .state('dashboard', {
            url:'/dashboard',
            templateUrl: '/Client/Partials/dashboard.html',
            controller: 'dashboardController',
            controllerAs: 'dashboardCtrl'
        })

        $httpProvider.interceptors.push('authInterceptor');
};
/**
 * Created by Nishanth on 8/30/2016.
 */
       
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
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('/Client/Partials/about.html','<div class=container-fluid><h1>About page</h1></div>');
$templateCache.put('/Client/Partials/dashboard.html','<div class=jumbotron><h1>{{dashboardCtrl.message}}</h1></div>');
$templateCache.put('/Client/Partials/header.html','<div><ul class="nav nav-tabs pull-right"><li ui-sref-active=active><a ui-sref=home aria-expanded=false>Home</a>{{headerCtrl.isAuthenticated}}</li><li ng-show=headerCtrl.isAuthenticated() ui-sref-active=active><a ui-sref=profile aria-expanded=false>Profile</a></li><li ng-hide=headerCtrl.isAuthenticated() ui-sref-active=active><a ui-sref=login aria-expanded=true>log In</a></li><li ng-show=headerCtrl.isAuthenticated() ui-sref-active=active><a ui-sref=dashboard aria-expanded=false>Dashboard</a></li><li ng-show=headerCtrl.isAuthenticated() ui-sref-active=active><a ui-sref=logout aria-expanded=false>Logout</a></li></ul></div>');
$templateCache.put('/Client/Partials/home.html','<div class="jumbotron text-center"><h1>Welcome Home {{hello}}!</h1><input type=text ng-model=hello ng-change=printChange()> <button class="btn btn-primary" ui-sref=about>About</button> <button class="btn btn-success" ui-sref=signup>Sign-up!</button> <button class="btn btn-success" ui-sref=login>Log-in!</button></div>');
$templateCache.put('/Client/Partials/loginTemplate.html','<div class=container><form class=form-signin><h2 class=form-signin-heading>Please Login IN</h2><label for=inputEmail class=sr-only>Email address</label> <input type=email id=inputEmail class=form-control placeholder="Email address" ng-model=loginCtrl.email required autofocus> <label for=inputPassword class=sr-only>Password</label> <input type=password id=inputPassword class=form-control ng-model=loginCtrl.password placeholder=Password required><div class=checkbox><label><input type=checkbox value=remember-me> Remember me</label></div><button class="btn btn-lg btn-primary btn-block" type=submit ng-click=loginCtrl.login()>Login Me In!</button><br><p class="text-muted pull-right">Not registered yet?<br><a class=pull-right ui-sref=signup>Create a new Account</a></p></form><div class=row style="margin-top: 50px;"><div class=col-md-4><button class="btn btn-lg btn-danger btn-block" ng-click=loginCtrl.googleLogin() type=button><i class="fa fa-google-plus" aria-hidden=true></i> Sign in with Google</button></div><div class=col-md-4><button class="btn btn-lg btn-primary btn-block" ng-click=facebookLogin() type=button><i class="fa fa-facebook-square" aria-hidden=true></i> Sign in with facebook</button></div><div class=col-md-4><button class="btn btn-lg btn-default btn-block" ng-click=TwitterLogin() type=button><i class="fa fa-github" aria-hidden=true></i> Sign in with twitter</button></div></div></div>');
$templateCache.put('/Client/Partials/profile.html','<div class="jumbotron form-signin"><h1>Profile</h1><label for=inputFirstName class=sr-only>First Name</label> <input type=text id=inputFirstName class=form-control placeholder="First Name" ng-model=profileCtrl.firstName> <label for=inputLastName class=sr-only>Last Name</label> <input type=text id=inputLastName class=form-control placeholder="Last Name" ng-model=profileCtrl.lastName> <label for=inputEmail class=sr-only>Email address</label> <input type=email id=inputEmail class=form-control placeholder="Email address" ng-model=profileCtrl.email><ul ng-repeat="interest in profileCtrl.interests">{{interest}}</ul></div>');
$templateCache.put('/Client/Partials/signupTemplate.html','<div class=container><form class=form-signin><h2 class="form-signin-heading text-muted">Sign Up!</h2><label for=inputFirstName class=sr-only>First Name</label> <input type=text id=inputFirstName class=form-control placeholder="First Name" ng-model=signupCtrl.firstName required autofocus> <label for=inputLastName class=sr-only>Last Name</label> <input type=text id=inputLastName class=form-control placeholder="Last Name" ng-model=signupCtrl.lastName autofocus> <label for=inputEmail class=sr-only>Email address</label> <input type=email id=inputEmail class=form-control placeholder="Email address" ng-model=signupCtrl.email required autofocus> <label for=inputPassword class=sr-only>Password</label> <input type=password id=inputPassword class=form-control placeholder=Password ng-model=signupCtrl.password required> <input type=password id=confirmPassword class=form-control placeholder="Confirm Password" required> <button class="btn btn-lg btn-primary btn-block" type=submit ng-click=signupCtrl.signup()>Sign Up</button><br><p class=pull-right>Already Registered? Login <a ui-sref=login>here</a></p></form></div>');}]);
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
(function(){
'use-strict';

angular.module('app').factory('authInterceptor', authInterceptor)

authInterceptor.$inject = [
	'authTokenFactory'
];

function authInterceptor(authTokenFactory){
	return{
		request: request,
		response: response
	}

	function request(config){
		var token = authTokenFactory.getToken();

		if(token)
			config.headers.Authorization = 'Bearer ' + token;

		return config;
	}

	function response(res){
		return res;
	}
}
})();
(function(){

angular.module('app').factory('authServiceFactory', authServiceFactory);

authServiceFactory.$inject = [
	'$http',
    '$state',
    '$window',
    '$q',
    'authTokenFactory'
];

function authServiceFactory($http, $state, $window, $q, authTokenFactory){
	var service = {
		login : loginHandler,
		signup : signupHandler,
        googleAuth : googleAuthHandler
	};

	return service;

    function authSuccessful(res){
        authTokenFactory.setToken(res.token);
        $state.go('dashboard');
    }

    function loginHandler(url, cred) {
            return $http.post(url, cred).success(authSuccessful);
        }

    function signupHandler(url,cred) {
        return $http.post(url,cred).success(authSuccessful);
    }


    function googleAuthHandler() {
        
        var clientId = '299585083072-vt5ot91ldob4fnnjpfjnke4vgrisd3bp.apps.googleusercontent.com';
        var urlBuilder = [];
            urlBuilder.push('response_type=code',
                'client_id=' + clientId,
                'redirect_uri=' + window.location.origin,
                'scope=profile email'
            )

        var url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlBuilder.join('&');
        var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 +",top=" + ($window.outeHeight -500 ) /2.5;
        
        var deferred = $q.defer();
        var popup = $window.open(url, "", options);
        $window.focus();

        $window.addEventListener('message', function(event){
            if(event.origin === $window.location.origin){
                var code = event.data;
                popup.close();

                $http.post('auth/google', {
                    code : code,
                    clientId : clientId,
                    redirectUri: $window.location.origin
                }).success(function(jwt){
                    authSuccessful(jwt);
                    deferred.resolve(jwt);
                });
                    
            }
        })

        return deferred.promise;
    }
}

})();
(function(){

angular.module('app').factory('authTokenFactory', authTokenFactory);

authTokenFactory.$inject = [
	'$window'
];

function authTokenFactory($window){
	var storage = $window.localStorage;
    var cachedToken;
    var authTokenFactory = {
        setToken : setToken,
        getToken : getToken,
        isAuthenticated : isAuthenticated,
        removeToken: removeToken
    }

    return authTokenFactory;

    function setToken(token){
        console.log('setting token' + token);
        cachedToken = token;
        $window.localStorage.setItem('userToken',token);
    }

    function getToken(){
        if(!cachedToken)
            cachedToken = localStorage.getItem('userToken');

        return cachedToken;
    }

    function isAuthenticated(){
        return !!authTokenFactory.getToken();
    }

    function removeToken(){
        cachedToken = null;
        localStorage.removeItem('userToken');
    }
}

})();
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
(function(){
'use-strict';
angular.module('app').controller('dashboardController', dashboardController);

dashboardController.$inject = ['$scope'];

function dashboardController($scope){
 var self = this;
 this.message = 'Welcome to You Dashboard';
}

})();
(function(){

angular.module('app').controller('loginController', loginController);
loginController.$inject = [
	'$state',
	'$http',
	'authServiceFactory'
];

function loginController($state, $http, authServiceFactory){
    var loginCtrl = this;
	loginCtrl.login = login;
	loginCtrl.googleLogin = googleLogin;

	function login() {
        var email = loginCtrl.email;
        var password = loginCtrl.password;

        var payload = {
            email: email,
            password: password
        };

        authServiceFactory.login('/login', payload)
        		.success(function(res){
        			console.log('Thanks for coming back ' + res.user.email + '!');
        		})
        		.error(function(res){
        			console.log('Something went wrong, Please try again!');
        		})
    }	

    function googleLogin() {
    	authServiceFactory.googleAuth().then(function(){
    		console.log('Thanks for signing in' + res.user.displayName + '!');
    	}, function(err){
    		console.log('Something went wrong, Please try again!');
    	});
    }
}
})();
(function(){
'use-strict';

angular.module('app').controller('logoutController', logoutController);

logoutController.$inject = [
	'authTokenFactory',
	'$state'
];

function logoutController(authTokenFactory, $state){
	authTokenFactory.removeToken();
	$state.go('login');
}
})();
(function(){
'use-strict';

angular.module('app').controller('profileController', profileController);
profileController.$inject = [
	'$http'
];

function profileController($http){
	var self = this;

	$http.get('http://localhost:3000/profile')
	.success(function(profile){
		$scope.profile = profile;
	})
	.error(function(err){
		alert(err.message);
	})
}

})();
//# sourceMappingURL=app.js.map
