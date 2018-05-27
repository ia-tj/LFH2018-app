"use strict";

var app = angular.module("ia3vpApp", ['ngSanitize']);


app.controller("ementaCtrl", function($scope, $http) {
	
	$scope.buscar = function(textoBusca) {
		var query = '';
		if (textoBusca) {
			query = 'q=ementa:' + textoBusca
		}
		$http({
			method : 'GET',
			url : 'http://localhost:9200/ia3vp/acordao/_search/?' + query
		}).then(function successCallback(response) {
			$scope.acordaos = [];
			$scope.filtro = {};
			
			var data = response.data;
			$scope.filtro.total = data.hits.total

			angular.forEach(data.hits.hits, function(value, key) {
				// TODO: Ajustar campos no índice
				this.push(value['_source']);
			}, $scope.acordaos);

		}, function errorCallback(response) {
			$scope.response = response;
		});
	};
	
	$scope.buscar();
});


app.filter('cnj', function() {
   return function(val){
	   if (val) {		   
		   return val.replace(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})$/, '$1-$2.$3.$4.$5.$6');
	   }
	   return val;
   };
});