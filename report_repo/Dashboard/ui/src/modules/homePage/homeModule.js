homeModule.service('plcService',  [ 
                  'HttpAppService', function (HttpAppService) { 

                	  
                	  
         	  
return { 
	// 下拉值接口：生产区域、接线、设备类型、设备编码  
	//dataWorkCenters: requestDataWorkCenters,
	
           dataLines: requestDataLines,
	//dataResourceTypes: requestDataResourceTypes,
	dataResourceCodes: requestDataResourceCodes,
           
           setFactoryName : setFactoryName,
	setCallback : setCallback,
           setDeviceTypeCallback : setDeviceTypeCallback,
           setInitCallback : setInitCallback,
          
           currentFactory : null,

	search: search,
};

function search(workCenter, line, type, array){
	var url = HttpAppService.URLS.SEARCH 
				.replace("#{WORK_CENTER}#", workCenter)
				.replace("#{LINE}#", line)
				.replace("#{TYPE}#", type)
				.replace("#{CODE}#", array)
				.replace("#{SITE}#", this.currentFactory);
          

           console.log("search url:   " +encodeURI(url));
	return HttpAppService.get({ 
		url: encodeURI(url) 
	}); 
};


function setFactoryName(name) {
        this.currentFactory = name;
        var url = HttpAppService.URLS.XLZ_WORK_CENTERS+name;
        console.log("work center url:" + url);
        var that = this;

        this.initCallback();
        
        HttpAppService.get({
		url: url
        }).then(function (resultDatas){
                that.callback(resultDatas);
       },function (resultDatas){ //TODO 检验失败
                $scope.addAlert(resultDatas.myHttpConfig.statusDesc);
       });


        var resourceTypeUrl = HttpAppService.URLS.XLZ_RESOURCE_TYPES+name;
        console.log("resource type url:" + resourceTypeUrl);
        HttpAppService.get({
		url: resourceTypeUrl
        }).then(function (resultDatas){
                that.deviceTypeCallback(resultDatas);
       },function (resultDatas){ //TODO 检验失败
                $scope.addAlert(resultDatas.myHttpConfig.statusDesc);
       });

}

function setCallback(callback) {
	this.callback = callback;
}

function setDeviceTypeCallback(callback) {
	this.deviceTypeCallback = callback;
}

function setInitCallback(callback) {
	this.initCallback = callback;
}


// 下拉值接口
function requestDataWorkCenters(){
	var url = HttpAppService.URLS.XLZ_WORK_CENTERS+"1030";
	return HttpAppService.get({
		url: url
	});
};
function requestDataLines(workCenter){
	var url = HttpAppService.URLS.XLZ_LINES.replace("#{WORK_CENTER}#", workCenter) + this.currentFactory;
           console.log("line url:   " + url);
	return HttpAppService.get({
		url: url
	});
}; 
function requestDataResourceTypes(){
	var url = HttpAppService.URLS.XLZ_RESOURCE_TYPES 
				.replace("#{SITE}#", HttpAppService.getSite()); 
	return HttpAppService.get({ 
		url: url 
	}); 
};
function requestDataResourceCodes(workCenter, line, resourceType){ 

	var url = HttpAppService.URLS.XLZ_RESOURCE_CODES 
				.replace("#{WORK_CENTER}#", workCenter) 
				.replace("#{LINE}#", line) 
				.replace("#{TYPE}#", resourceType) 
				;
          url = url + this.currentFactory;
          console.log("rcode:  " +url); 
	return HttpAppService.get({ 
		url: url
	}); 
};

}]);
















homeModule
    .run([ 
        '$templateCache',
        function ($templateCache){
            $templateCache.put('andon-ui-grid-threeLight/device-timely',
    		"<div class=\"ui-grid-cell-contents flex-center\" title=\"{{col.cellTooltip(row,col)}}\">" +
    		"<div ng-switch=\"row.entity.COLOR_LIGHT\">" +
    		"<img ng-switch-when=\"R\" src=\"images/red.gif\" width=\"20\" height=\"20\" />" +
    		"<img ng-switch-when=\"G\" src=\"images/green.gif\" width=\"20\" height=\"20\" />" +
    		"<img ng-switch-when=\"Y\" src=\"images/yellow.gif\" width=\"20\" height=\"20\" />" +
    		"</div></div>"
);

    }]);