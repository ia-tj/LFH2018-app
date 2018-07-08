"use strict";

var app = angular.module("lfhApp", ['ngSanitize']);

app.controller("lfhCtrl", function($rootScope, $scope, api) {
	
	$rootScope.brand = 'IA[RR]²';
	$rootScope.brandDetail = 'Lawtech Hackathon 2018';
	
	$scope.auth = function() {
		$scope.usuario = {email: $scope.email};
	}
	
	$scope.logout = function() {
		$scope.usuario = null;
	}
	
	var carregarLista = function() {
		$scope.documentos = api.getDocumentos();
	}
	
	carregarLista();
});