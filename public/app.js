"use strict";

var app = angular.module("lfhApp", ['ngSanitize']);

app.controller("lfhCtrl", function($rootScope, $scope, api) {
	
	$rootScope.brand = 'IA[RR]²';
	$rootScope.brandDetail = 'Lawtech Hackathon 2018';
	
	$scope.auth = function() {
		$scope.usuario = {email: $scope.email};
		
		carregarLista();
	}
	
	$scope.logout = function() {
		$scope.usuario = null;
	}
	
	$scope.setDocumentoAtual = function(doc) {
		$scope.documentoAtual = doc;
		carregarProcessos(doc);
	}
	
	var carregarProcessos = function(docAtual) {
		$scope.processos = {};
		angular.forEach($scope.documentos, function(doc, i) {
			if (docAtual.topicos_principais == doc.topicos_principais) {
				this[doc.numero_processo] = {numero_processo: doc.numero_processo, grau: 1, status: "JULGADO"}
			}
		}, $scope.processos);
	}
	
	var carregarLista = function() {
		$scope.documentos = api.getDocumentos();
	}

	//$scope.auth();
});

app.filter('cnj', function() {
	return function(input) {
		return input.replace(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})/,"$1-$2.$3.$4.$5.$6");
	};
});