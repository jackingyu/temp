moveModule.directive('moveTemplate',['UtilsService','$timeout',function(UtilsService,$timeout){
    return{
        restrict:'ACME',
        scope: true,
        controller:function($scope, $element){
            $scope.bodyConfig.animateOut = false;
            $scope.bodyConfig.animateSelect = false;
            $scope.animateToggle = function(){
                $scope.bodyConfig.animateOut = !$scope.bodyConfig.animateOut;
                $scope.bodyConfig.animateSelect = !$scope.bodyConfig.animateOut;
                $timeout(function (){
                    $scope.bodyConfig.animateSelect = !$scope.bodyConfig.animateSelect
                }, 300);
            };
        },
        templateUrl:'modules/public/move/move.html'
    }
}]);