var AppModuleName = "AndonApp";
var utilsModule = angular.module('utilsModule', []);
var homeModule = angular.module('homeModule', []);
var moveModule= angular.module('moveModule', []);

var AppModule = angular.module(AppModuleName, [ 'ngAnimate', 'ngTouch',
		'frapontillo.bootstrap-switch', 'ui.grid', 'ui.grid.pagination',
		'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.rowEdit',
		'ui.grid.validate', 'ui.grid.autoResize', 'ui.grid.selection',
		'ui.select', 'ui.grid.selection', 'ui.grid.resizeColumns',
		'ngSanitize', 'ngStorage', 'ui.router', 'ui.bootstrap', 'oc.lazyLoad',
		'utilsModule', 'homeModule','moveModule' ]);

/* ???
angular.module(AppModuleName).run([ "$rootScope", function($rootScope) {
	$rootScope.rootConfig = {
		currentLang : ROOTCONFIG.AndonConfig.currentLang,
		userInfo : {
		}
	};
	$rootScope.rootDatas = {};
} ]);
*/
AppModule.config([
	"$stateProvider","$urlRouterProvider",'$ocLazyLoadProvider',  function(
	 $stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

		$urlRouterProvider.otherwise("/andon/homepage");

		$ocLazyLoadProvider.config({
			debug : true
		});

		$stateProvider.state('andon', {
			abstract : true,
			url : '/andon',
			templateUrl : 'modules/homePage/absHomePage.html',
			controller : 'absHomePageCtrl'
		}).state('andon.home', {
			url : '/homepage',
			templateUrl : 'modules/homePage/HomeMain.html',
			controller : 'homePageCtrl'
		});

} ]);


AppModule.filter("adHeaderBarTimeFilter", [function(){
		return function(timeDate){
			return timeDate.pattern("yyyy年MM月dd日 EEE HH:mm");
		} 
	}]); 

AppModule.controller('BodyCtrl',[
		'$scope','$rootScope','$timeout','i18nService', 'homeService', function(
		 $scope, $rootScope, $timeout, i18nService, homeService) {
	console.log("Body controller");
	$scope.bodyConfig = {
			alerts: [
				//	 { type: 'danger', msg: '危险提示' },
				//	 { type: 'success', msg: '成功提示' }
			],
			//往上伸缩用到的参数
			animateOut:false,
			animateSelect:false,

			
			//factoryList: [{id: 0, name: '请选择工厂', code: 0, icon: 'ion-ios-keypad' }],
                                factoryList: [],
			currentFactory: {},
	};
	$scope.addAlert = function(type, msg) {
		var i = $scope.bodyConfig.alerts.length;
		if (arguments.length == 1) {
			$scope.bodyConfig.alerts.push({
				msg : arguments[0]
			});
		} else {
			$scope.bodyConfig.alerts.push({
				type : type,
				msg : msg
			});
		}
		var outTime = 2500;
		if (type == 'danger') {
			outTime = 5000;
		}
		$timeout(function() {
			$scope.closeAlert(i);
		}, outTime);
	};
	$scope.clearAlerts = function() {
		$scope.bodyConfig.alerts = [];
	};
	$scope.closeAlert = function(index) {
		$scope.bodyConfig.alerts.splice(index, 1);
	};


	$scope.bodyDatas = {
		userInfo : {}
	};

	$scope.init = function() {
		//$scope.bodyConfig.functionsList = angular.copy($scope.bodyConfig.functionsListDefaults);
		//i18nService.setCurrentLang($rootScope.rootConfig.currentLang);
		$scope.bodyConfig.currentTime = new Date();
		//$timeout(function() {
			__updateNowTime();
		//}, 60);		

		__requestSiteList();

	};

	$scope.init();

	function __updateNowTime() {
		$scope.bodyConfig.currentTime = new Date();
		$timeout(function() {
			__updateNowTime();
		}, 60);
	};


function __requestSiteList(){

        homeService.siteList().then(function (resultDatas){            
            console.log("get site list");
            //console.log(resultDatas.response.Rowsets.Rowset[0].Row);
           
            console.log("default factory:   "+ window.urlParams.Site);
            var site = window.urlParams.Site;



             var array = resultDatas.response.Rowsets.Rowset[0].Row;
                    if(array && array.length > 0){
		  for(var i=0;i<array.length;i++){
			$scope.bodyConfig.factoryList.push({
                                               id: array[i].SITE, 
                                               name: array[i].DESCRIPTION, 
                                               code:array[i].SITE, 
                                               icon: 'ion-ios-keypad' });
		  }

		  console.log($scope.bodyConfig.factoryList);
		  
		  for(var i=0;i<$scope.bodyConfig.factoryList.length;i++) {
			if( $scope.bodyConfig.factoryList[i].code  == site ) {
                                       $scope.bodyConfig.currentFactory.name = $scope.bodyConfig.factoryList[i].name;
                                       $scope.bodyConfig.currentFactory.code = $scope.bodyConfig.factoryList[i].code;
			}
		   }


                        return;
                    }
                }, function (resultDatas){
                    $scope.addAlert("danger", resultDatas.myHttpConfig.statusDesc);
                }
        );
    };



  $scope.factorySelectChange = function(event) {
         console.log("factory change");
         console.log($scope.bodyConfig.factoryList);
         console.log($scope.bodyConfig.currentFactory.code);
         homeService.setCurrentFactory($scope.bodyConfig.currentFactory.code);
  };

} ]);
