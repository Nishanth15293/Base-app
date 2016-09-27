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
    console.log($httpProvider);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: '/Client/Partials/home.html',
            controller: 'appController',
            controllerAs:'appCtrl'
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
            controller: 'appController',
            controllerAs:'appCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/Client/Partials/loginTemplate.html',
            controller: 'appController',
            controllerAs:'appCtrl'
        })

        .state('logout', {
            url:'/logout',
            controller: 'logoutController',
            controllerAs: 'logoutCtrl'
        })

        $httpProvider.interceptors.push('authInterceptor');
};