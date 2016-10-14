/**
 * Created by Nishanth on 8/30/2016.
 */

angular.module('app').config(config);

config.$inject = [
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$authProvider'
];

function config($httpProvider, $stateProvider, $urlRouterProvider, $authProvider) {

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
        $authProvider.loginUrl = '/login'
        $authProvider.signupUrl = '/signup'
        $authProvider.google({
            clientId: '299585083072-vt5ot91ldob4fnnjpfjnke4vgrisd3bp.apps.googleusercontent.com'
        })
        $authProvider.facebook({
            clientId: '828161080654703'
        })

        $httpProvider.interceptors.push('authInterceptor');
};