homeModule.controller('homePageCtrl',[
'$scope','$http','HttpAppService','$timeout','plcService',
	'uiGridConstants','$q','UtilsService','uiGridValidateService',
	function(
	 $scope,$http,HttpAppService,$timeout,plcService,
	 uiGridConstants,$q,UtilsService,uiGridValidateService) {

		$scope.netInfoGridOptions = {
			enablePagination : false,
			// paginationTemplate: 'ui-grid/pagination',
			totalItems : 0,
			useExternalPagination : false,
			showGridFooter : false,
			modifierKeysToMultiSelectCells : false,
			data : [],
			columnDefs : [
					{
						field : 'RESRCE',
						name : 'RESRCE',
						displayName : '设备编码',
						visible : true,
						minWidth : 100,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : false
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'RESRCE_NAME',
						name : 'RESRCE_NAME',
						displayName : '设备名称',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'LINE_AREA_DES',
						name : 'LINE_AREA_DES',
						displayName : '设备位置',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'RESOURCE_STATE',
						name : 'RESOURCE_STATE',
						displayName : '运行状态',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'REALTIME_PPM',
						name : 'REALTIME_PPM',
						displayName : '实时PPM',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'COLOR_LIGHT',
						name : 'COLOR_LIGHT',
						displayName : '三色灯',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						//cellTemplate : 'andon-ui-grid-threeLight/device-timely',
						cellTemplate:'andon-ui-grid-threeLight/device-timely',
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'ALERT_COUNT',
						name : 'ALERT_COUNT',
						displayName : '当日累计报警次数',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					},
					{
						field : 'HALT_COUNT',
						name : 'HALT_COUNT',
						displayName : '当日累计停机次数',
						visible : true,
						minWidth : 150,
						enableCellEdit : false,
						enableCellEditOnFocus : false,
						enableColumnMenu : false,
						enableColumnMenus : false,
						validators : {
							required : true
						},
						cellClass:function(row, col) {
    							switch (col.entity.COLOR_LIGHT){
        							case 'R' : return 'grid-no-editable high-light-red';break;

        							case 'Y' : return 'grid-no-editable high-light-yellow';break;
    							}
						},
						cellTooltip : function(row, col) {
							return row.entity[col.colDef.name];
						}
					}
			]
   };

$scope.config = {
        gridApi: null,
        // $scope.config.$workCenterSelect
        // $scope.config.$lineSelect
        $workCenterSelect: null,
        $lineSelect: null,
        $deviceTypeSelect: null,
        $deviceNumSelect: null,

        btnDisabledQuery: true,
        
        defaultSelectItem: { descriptionNew:"--- 请选择 ---", DESCRIPTION:"--- 请选择 ---", WORK_CENTER: null},
        defaultSelectItemType: { descriptionNew:"--- 请选择 ---", DESCRIPTION:"--- 请选择 ---", RESOURCE_TYPE: ""},
        defaultSelectItemCode: { descriptionNew:"--- 请选择 ---", DESCRIPTION:"--- 请选择 ---", },
        
        workCenters: [],
        currentWorkCenter: null,   //selected work center
        
        lines: [],
        currentLine: null,
        
        deviceTypes: [],
        currentDeviceType: null,
        
        deviceNums: [],
        currentDeviceNums: [],

        plcProtocols: []

    }; 

   $scope.init = function(){
        __initDropdowns();
        __requestDropdownWorkCenters();
        __requestDropdownDeviceTypes();

        plcService.setInitCallback(__initDropdowns);
    };

   $scope.init();

  //TODO setFactoryName
  (function () {
        console.log("home ctrls default factory:  " + $scope.bodyConfig.currentFactory.code)
        plcService.setFactoryName($scope.bodyConfig.currentFactory.code);
  })();  





    function __initDropdowns(){
        $scope.config.workCenters = [];
        $scope.config.workCenters.push($scope.config.defaultSelectItem);
        $scope.config.currentWorkCenter = null;

        __initLineDropdown();

        $scope.config.deviceTypes = [];
        $scope.config.deviceTypes.push($scope.config.defaultSelectItemType);
        $scope.config.currentDeviceType = null;

        __initNumsDropdown();
    };

   function __initNumsDropdown() {
        $scope.config.deviceNums = [];
        $scope.config.deviceNums.push($scope.config.defaultSelectItem);
        $scope.config.currentDeviceNums = null;
    };

   function __initLineDropdown() {
        $scope.config.lines = [];
        $scope.config.lines.push($scope.config.defaultSelectItem);
        $scope.config.currentLine = null;
    };

  function __requestDropdownWorkCenters(){
         var callback = function(resultDatas) {
                     $scope.config.workCenters = [];
                     $scope.config.workCenters.push($scope.config.defaultSelectItem);
                     $scope.config.currentWorkCenter = null;

                     var array = resultDatas.response.Rowsets.Rowset[0].Row;
                     if(array && array.length > 0){
                               console.log("init request work center");
                               console.log(array);
                               for(var i = 0; i < array.length; i++){
                             		array[i].descriptionNew = "代码:"+array[i].WORK_CENTER+"   描述:"+array[i].DESCRIPTION;
                             		$scope.config.workCenters.push(array[i]);
                               }
                     } 
      };
      
      plcService.setCallback(callback);
  };

function __requestDropdownDeviceTypes(){
     var callback = function(resultDatas) {

                    $scope.config.deviceTypes = [];
                    $scope.config.deviceTypes.push($scope.config.defaultSelectItemType);
                    $scope.config.currentDeviceType = null;

                     var array = resultDatas.response.Rowsets.Rowset[0].Row;
                     if(array && array.length > 0){
                            console.log("init device type");
                            console.log(array);
                            for(var i = 0; i < array.length; i++){
                                array[i].descriptionNew = "代码:"+array[i].RESOURCE_TYPE+"   描述:"+array[i].DESCRIPTION;
                                $scope.config.deviceTypes.push(array[i]);
                            }
                     } 
      };
      plcService.setDeviceTypeCallback(callback);
    };


     function __requestDropdownLines(workCenter){
            plcService.dataLines(workCenter).then(function(resultDatas){
                console.log("load lines");
                 var array = resultDatas.response.Rowsets.Rowset[0].Row;
	      __initLineDropdown();
                console.log(array);
                if(array && array.length > 0){
                        for(var i = 0; i < array.length; i++){
                            array[i].descriptionNew = "代码:"+array[i].WORK_CENTER+"   描述:"+array[i].DESCRIPTION;
                            $scope.config.lines.push(array[i]);
                        }
                        //toggle 什么意思
                        //$scope.config.$lineSelect.toggle();
                        return;
                    } 
                },function (resultDatas){ 
                    $scope.addAlert(resultDatas.myHttpConfig.statusDesc);
                }); 
    }; 

    /////   生成区域、级联选择
   $scope.workCenterChanged = function(event){
        if($scope.config.currentWorkCenter == null || $scope.config.currentWorkCenter.WORK_CENTER==null){  
            console.log("nothing selected");
	$scope.config.btnDisabledQuery = true;
            __initLineDropdown();
           $scope.config.currentWorkCenterTitle = "";
        }else{
            console.log("work center changed");
            console.log($scope.config.currentWorkCenter.WORK_CENTER);
            $scope.config.btnDisabledQuery = false;
            var workCenter = $scope.config.currentWorkCenter.WORK_CENTER;
            console.log($scope.config.currentWorkCenter.WORK_CENTER);
            __requestDropdownLines(workCenter);
	 $scope.config.currentWorkCenterTitle = "生产区域:       " +$scope.config.currentWorkCenter.DESCRIPTION;
        } 
    };

$scope.lineChanged = function(event){
        if($scope.config.currentLine == null || $scope.config.currentLine.WORK_CENTER==null){  
            console.log("nothing selected");
            $scope.config.currentLineTitle = "";
        }else{
            console.log("line changed");
            console.log($scope.config.currentLine.WORK_CENTER);
            $scope.config.currentLineTitle = "拉线:       " +$scope.config.currentLine.DESCRIPTION;
            __requestDropdownDeviceCodes();
        } 


    };

    $scope.deviceTypeChanged = function(event){
        if($scope.config.currentDeviceType == null || $scope.config.currentDeviceType.RESOURCE_TYPE==null){  
            console.log("nothing selected");
            console.log($scope.config.currentDeviceType);
        }else{
            console.log("device type changed");
            console.log($scope.config.currentDeviceType.RESOURCE_TYPE);
        } 
        __requestDropdownDeviceCodes();
    };


        function __requestDropdownDeviceCodes(){ 
                    var workCenter = $scope.config.currentWorkCenter == null ? "" : $scope.config.currentWorkCenter.WORK_CENTER;
                    var line = $scope.config.currentLine == null ? "" : $scope.config.currentLine.WORK_CENTER;
                    var deviceType = $scope.config.currentDeviceType == null ? "" : $scope.config.currentDeviceType.RESOURCE_TYPE;
                
           
                    plcService .dataResourceCodes(workCenter, line, deviceType).then(function (resultDatas){
                             console.log("load code");              	   
                              var array = resultDatas.response.Rowsets.Rowset[0].Row;

                	        $scope.config.deviceNums=[];
                	        $scope.config.currentDeviceNums = [];
                	        console.log(array);

		        if(array && array.length > 0){
                            	for(var i = 0; i < array.length; i++){
                                	array[i].descriptionNew = "代码:"+array[i].RESRCE+"   描述:"+array[i].DESCRIPTION;
                                	$scope.config.deviceNums.push(array[i]);
                             	}
                                return; 
                              }

                    },function (resultDatas){ //TODO 检验失败
                        $scope.addAlert(resultDatas.myHttpConfig.statusDesc);
                    }); 
        };





$scope.factorySelectChange = function(event) {
     console.log("factory change");
     $scope.init();
};



$scope.queryDatas = function(){
        search(); 
};

function search() {

        var workCenter = $scope.config.currentWorkCenter.WORK_CENTER;
        var line = $scope.config.currentLine == null ? "" : $scope.config.currentLine.WORK_CENTER;
        var deviceType = $scope.config.currentDeviceType == null ? "" : $scope.config.currentDeviceType.RESOURCE_TYPE;
        var codeArray = $scope.config.currentDeviceNums == null ? "" : $scope.config.currentDeviceNums;
        var codeString = [];
        if(codeArray != null) {
	      for(var i = 0; i < codeArray.length; i++){
		  codeString[i] = "''"+codeArray[i].RESRCE +"''";
	      }
        }        
        $scope.netInfoGridOptions.data = [];
        plcService.search(workCenter, line, deviceType, codeString.toString()).then(function(resultDatas){
    	       var array = resultDatas.response.Rowsets.Rowset[0].Row;
                  console.log("search result");
	       console.log(array);
	       $scope.netInfoGridOptions.data = array;
         });

        $timeout(function(){
                      console.log(new Date());
		search();
         }, 72000);

};


}]);   