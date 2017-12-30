'use strict';

/* App Module */

var theBoxApp = angular.module('theBoxApp', [
  'ngRoute',
  'phonecatAnimations',
  'boxControllers',
  'phonecatFilters',
  'boxServices',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.exporter'
]);

theBoxApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
      when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'betaContoller'
      }).
      when('/category', {
          templateUrl: 'partials/categories.html',
          controller: 'categoryCtrl',
          reloadOnSearch: false
      }).
	  otherwise({
		  templateUrl: 'partials/categories.html',
          controller: 'categoryCtrl',
          reloadOnSearch: false
	  });
  } ]);
