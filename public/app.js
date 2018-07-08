"use strict";

var app = angular.module("lfhApp", ['ngSanitize', 'chart.js']);

app.controller("lfhCtrl", function($rootScope, $scope, api) {
	
	$rootScope.brand = 'IADR';
	$rootScope.brandDetail = 'Identificação de Demandas Repetitivas';
	
	$scope.auth = function() {
		$scope.usuario = {email: $scope.email};
		
		carregarLista();
	}
	
	$scope.logout = function() {
		$scope.usuario = null;
	}
	
	$scope.carregarStatusProcessos = function(processos) {
		var segundoJulgado = 0;
		var primeiro = 0;
		var segundoPendente = 0;
		
		angular.forEach(processos, function(processo, i) {
			processo.grau = Math.floor((Math.random() * 2) + 1);
			if (processo.grau == 2) {
				processo.status = Math.floor((Math.random() * 2) + 1) == 1 ? "PENDENTE" : "JULGADO";
			}
			
			if (processo.grau == 1) {
				primeiro++;
				processo.statusLabel = 'lfh-badge-secondary badge-secondary';
			} else if (processo.grau == 2) {
				if (processo.status == "JULGADO") {
					segundoJulgado++;
					processo.statusLabel = 'badge-primary';
				} else {
					segundoPendente++;
					processo.statusLabel = 'badge-danger';
				}
			}
		});
		
		$scope.graph = {};
		$scope.graph.labels = ["2º Julgado", "1º", "2º Pendente"];
		$scope.graph.data = [segundoJulgado, primeiro, segundoPendente];
	}
	
	var carregarLista = function() {
		$scope.topicos = api.getTopicos();
	}
});

app.filter('cnj', function() {
	return function(input) {
		return input.replace(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})/,"$1-$2.$3.$4.$5.$6");
	};
});