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