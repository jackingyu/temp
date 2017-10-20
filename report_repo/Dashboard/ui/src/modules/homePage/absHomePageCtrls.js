homeModule.controller('absHomePageCtrl', [
		'$scope',
		'$http',
		'$q',
		'HttpAppService',
		'$timeout',
		'$interval',
		'uiGridConstants',
		'gridUtil',
		function($scope, $http, $q, HttpAppService, $timeout, $interval,
				uiGridConstants, gridUtil) {

			$scope.initUI = function() {
				$timeout(function() {
					initAdminLTEUI();
				}, 2000);
			};

			console.log("abs Home controller");
}]);