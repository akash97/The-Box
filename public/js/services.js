'use strict';

/* Services */

var boxServices = angular.module('boxServices', ['ngResource']);

boxServices.factory('Category', ['$resource',
  function ($resource) {
      return $resource('category/:categories.json', {}, {
          query: { method: 'GET', params: { categories: 'categories' }, isArray: true }
      });
  } ]);
boxServices.factory('dataBaseA', ['$resource',
  function ($resource) {
      return $resource('category/databaseA.json', {}, {
          query: { method: 'GET', isArray: true }
      });
  } ]);
boxServices.factory('dataBaseE', ['$resource',
  function ($resource) {
      return $resource('category/databaseE.json', {}, {
          query: { method: 'GET', isArray: true }
      });
  } ]);
boxServices.factory('dataA', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/draws');
			},
			create : function(data) {
				return $http.post('/api/draws', data);
			},
			save : function(id, data) {
				return $http.put('/api/draws/' + id, data);
			},
			delete : function(id) {
				return $http.delete('/api/draws/' + id);
			}
		}
	}]);
boxServices.factory('dataABCD', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/drawABCD');
			},
			create : function(data) {
				return $http.post('/api/drawABCD', data);
			},
			save : function(id, data) {
				return $http.put('/api/drawABCD/' + id, data);
			},
			delete : function(id) {
				return $http.delete('/api/drawABCD/' + id);
			}
		}
	}]);
boxServices.factory('dataEFGH', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/drawEFGH');
			},
			create : function(data) {
				return $http.post('/api/drawEFGH', data);
			},
			save : function(id, data) {
				return $http.put('/api/drawEFGH/' + id, data);
			},
			delete : function(id) {
				return $http.delete('/api/drawEFGH/' + id);
			}
		}
	}]);
