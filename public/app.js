"use strict";

var app = angular.module("lfhApp", ['ngSanitize', 'chart.js']);

app.controller("lfhCtrl", function($rootScope, $scope, api) {
	
	$rootScope.brand = 'IA[RR]²';
	$rootScope.brandDetail = 'Lawtech Hackathon 2018';
	
	$scope.auth = function() {
		$scope.usuario = {email: $scope.email};
		
		carregarLista();
	}
	
	$scope.logout = function() {
		$scope.usuario = null;
		setDocumentoAtual = null;
	}
	
	$scope.setDocumentoAtual = function(doc) {
		$scope.documentoAtual = doc;
		carregarProcessos(doc);
	}
	
	var carregarProcessos = function(docAtual) {
		var segundoJulgado = 0;
		var primeiro = 0;
		var segundoPendente = 0;
		
		$scope.processos = {};
		angular.forEach($scope.documentos, function(doc, i) {
			if (docAtual.topicos_principais == doc.topicos_principais) {
				var proc = getProcessoStatusAleatorio(doc);
				this[doc.numero_processo] = proc;
				
				if (proc.grau == 1) {
					primeiro++;
					proc.statusLabel = 'badge-danger';
				} else if (proc.grau == 2) {
					if (proc.status == "JULGADO") {
						segundoJulgado++;
						proc.statusLabel = 'badge-primary';
					} else {
						segundoPendente++;
						proc.statusLabel = 'lfh-badge-secondary badge-secondary';
					}
				}
			}
		}, $scope.processos);
		
		$scope.graph = {};
		$scope.graph.labels = ["2º Julgado", "1º", "2º Pendente"];
		$scope.graph.data = [segundoJulgado, primeiro, segundoPendente];
	}
	
	var getProcessoStatusAleatorio = function(doc) {
		var grau = Math.floor((Math.random() * 2) + 1);
		var status;
		if (grau == 2) {
			status = Math.floor((Math.random() * 2) + 1) == 1 ? "PENDENTE" : "JULGADO";
		}
		return {numero_processo: doc.numero_processo, grau: grau, status: status}
	}
	
	var carregarLista = function() {
		$scope.documentos = api.getDocumentos();
	}

	$scope.auth();
});

app.filter('cnj', function() {
	return function(input) {
		return input.replace(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})/,"$1-$2.$3.$4.$5.$6");
	};
});