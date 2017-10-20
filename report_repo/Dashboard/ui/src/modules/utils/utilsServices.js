	
utilsModule.factory('UtilsService', [
	'$filter', '$uibModal', '$q', function(
	 $filter,   $uibModal,   $q) {
		console.log("UtilsModules : Utils Service");
		return {	
			removeArrayByIndex : __removeArrayByIndex, 		
			// 传入日期对象eg:new Date()、返回服务器规定的格式：精确到天 		
			// UtilsService.serverFommateDate(dateObj) 		
			serverFommateDate: __serverFommateDate,
			serverFommateDateShow: __serverFommateDateShow,
			// 传入日期对象eg:new Date()、返回服务器规定的格式：精确到秒		 
			// UtilsService.serverFommateDateTime(dateObj) 		
			serverFommateDateTime: __serverFommateDateTime,
			serverFommateDateTimeShow: __serverFommateDateTimeShow,
			serverFommateDateTimeFrontShow:__serverFommateDateTimeFrontShow,

			//"MM/dd/yyyy-hh/mm/ss   TO   Date yyyy/mm/dd-hh/mm/ss"
			serverStringFormatDateTime:__serverStringFormatDateTime,

			//将单词转换为大写		
			toUpperCaseWord: __toUpperCaseWord,		

			isEmptyString: __isEmptyString,
			isEmptyArray: __isEmptyArray,
			
			// UI 提示相关 						
			/**                                 
			 * 用法:   			
			 * 		var promise = UtilsService.confirm(msg, title, btnLables);   eg: UtilsService.confirm('', '提示', ['确定', '取消']);
			 * 		promise 	
			 * 			.then(function(){ // ok 
			 * 					
			 * 			}, function(){   // cancel 
			 * 					
			 * 			});		
			 * 					
			 */					
			confirm: __confirm,
			alertAutoHidden: alertAutoHidden
		};

		function __serverStringFormatDateTime(dateString){
			if(dateString){
				var date = dateString.split('-');
				date[1] = date[1].replace('/',':').replace('/',':');
				date = date.join(' ');
				date = __serverFommateDateTimeFrontShow(new Date(date));
				return date;
			};
		};

		function alertAutoHidden(msg, title, dismiss){ // 显示时间:eg: 300，以ms为单位
			alert(msg);
		}

		function __isEmptyString(str){
			return angular.isUndefined(str) || str == null || str == '' ? 
					true 
					: (str.trim && str.trim() == '');
		};
		function __isEmptyArray(array){
			return angular.isUndefined(array) || array == null || array.length == 0;
		}

		function __confirm(msg, title, btnLables,scope){
			var okLabel = '确定';
			var cancelLabel = '取消';
			if(!angular.isUndefined(btnLables) && btnLables!=null && btnLables.length > 0 ){
				okLabel = btnLables[0];
				cancelLabel = btnLables[1];
			}
			var titleX = angular.isUndefined(title) || title == null || title == '' ? '提示' : title;
			var promise = $q.defer();
			var confirmModalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'modules/public/model/confirm_model.html',
	            controller: ['$scope', '$uibModalInstance', 'confirmInfo',function($scope, $uibModalInstance, confirmInfo){
	            	$scope.config = {
	            		title: confirmInfo.title, 
	            		bodyContent: confirmInfo.body
	            	};
	            	$scope.cancel = function(){ 
	            		$uibModalInstance.dismiss('cancel'); 
	            	}; 
	            	$scope.ok = function(){ 
	            		$uibModalInstance.close({ 
	            			comfirmOk: true 
	            		}); 
	            	}; 
	            }], 
	            size: 'sm',
	            backdrop:'static',
	            backdropClass: 'ad-public-model-confirm-bg',
	            openedClass:'flex-center-parent ad-public-model-confirm-open',
	            scope : scope,
	            resolve: { 
	               confirmInfo: function () {
	                   return {
	                        title: titleX,
	                        body: msg
	                   };
	               }
	            }
	        });
	        confirmModalInstance.result.then(function (okDatas) {
	           if(okDatas.comfirmOk){
	           		promise.resolve();
	           }else{
	           		promise.reject();
	           }
	        }, function () {  
	            promise.reject();  
	        });  
	        return promise.promise;
		}
		
		function __removeArrayByIndex(array, index){
			return array.slice(0,index).concat(array.slice(index+1));
		} 

		function __serverFommateDate(dateObject){
			if(angular.isUndefined(dateObject) || dateObject==null){
				return null;
			}
			// return $filter('date')(dateObject, 'yyyy-MM-dd');
			return $filter('date')(dateObject, 'MM/dd/yyyy');
		} 

		function __serverFommateDateTime(dateObject){
			if(angular.isUndefined(dateObject) || dateObject==null){
				return null;
			}
			return $filter('date')(dateObject, 'MM/dd/yyyy-HH/mm/ss');
		}
			function __serverFommateDateShow(dateObject){
				if(angular.isUndefined(dateObject) || dateObject==null){
					return null;
				}
				// return $filter('date')(dateObject, 'yyyy-MM-dd');
				return $filter('date')(dateObject, 'yyyy-MM-dd');
			}

			function __serverFommateDateTimeShow(dateObject){
				if(angular.isUndefined(dateObject) || dateObject==null){
					return null;
				}
				return $filter('date')(dateObject, 'yyyy-MM-dd HH:mm:ss');
			}
			function __serverFommateDateTimeFrontShow(dateObject){
				if(angular.isUndefined(dateObject) || dateObject==null){
					return null;
				}
				return $filter('date')(dateObject, 'yyyy-MM-dd HH:mm:ss');
			}
		function __toUpperCaseWord(words){
			var contain = [];
			if(words){
				for(var i=0;i<words.length;i++){
					contain[i] = words.charAt(i).toUpperCase();
				}
				return contain.join('');
			}

		}

	}]);

utilsModule.factory('HttpAppService', [ 
 	"$http", "$q", function(
 	 $http, $q) { 
 		console.log("UtilsModules : Http Service");
 		
                     var baseUrl = ROOTCONFIG.AndonConfig.basePath;
 		var projectName = ROOTCONFIG.AndonConfig.appPath;

                    var responseStatus = [
 			{ code: '500', desc: '服务器内部错误: 代码错误' },
 			{ code: '502', desc: '服务器内部错误: 网关设置错误' }
 		];
 		var errorMessages = {
 			'10001': '数据项代码没有维护',
 			'10028': '创建记录失败',
 			'10002': '数据项描述没有维护',
 			'10022': '删除记录失败',
 			'10003': '数据库字段不存在',
 			'10020': '记录已经存在',
 			'10025': '已经存在重复的时间',
 			'10004': '输入日期早于或等于已有日期',
 			'10005': '无效的开始时间格式',
 			'10006': '无效的输入参数',
 			'10007': '无效的项目',
 			'10008': '无效的数字格式',
 			'10009': '输入日期早于或等于已有日期', 
 			'10010': '无效的原因代码',
 			'10011': '无效的设备',
 			'10012': '无效的设备状态',
 			'10024': '无效的时间',
 			'10029': '用户没有权限',
 			'10031': '该记录在其他表中被引用，不能被删除',
 			'10013': '无效的作业中心',
 			'10036': '记录enable状态为false',
 			'10014': '字段不能为空',
 			'10015': '存在重复的记录',
 			'10016': '没有指定的维护通知或命令',
 			'10035': '不存在该记录或关联的记录',
 			'10030': '记录不存在',
 			'10017': '数据记录错误',
 			'10018': '寄存器值没有维护',
 			'10037': '未知的规则',
 			'10033': '未知的操作码',
 			'10021': '更新记录错误',
 			'10019': '上传文件格式错误',
 			'10034': '当前记录状态为used'
 		};	
	 	// HttpAppService.URLS.PLC_CATEGORY_LIST 
	 	// HttpAppService.URLS.PLC_CATEGORY_EXIT 
 		return {
 			post: post, 
 			get: get, 
 			getSite: function(){ 
 				return ROOTCONFIG.AndonConfig.SITE;
 			}, 
 			URLS: { 
 				// SITE: '1000', 
 				// mhp-oee
 				
 				LOGIN: baseUrl + "plant/site/#{SITE}#/j_security_check",
 				
 				//////////////////////////////////////////////////////////////////////// 
 				////// 下拉值 相关接口 : 
 				//////////////////////////////////////////////////////////////////////// 

				SEARCH: baseUrl + "/XMII/Illuminator?QueryTemplate="+projectName+  
                                              "/ResourceStatus_RealtimeDashboard/QUERY/getResultXQRY&IsTesting=T&Content-Type=text/json&Param.1=#{WORK_CENTER}#&Param.2=#{LINE}#&Param.3=#{TYPE}#&Param.4=#{CODE}#&Param.5=#{SITE}#",



 				//生产区域接口get 
 				 XLZ_WORK_CENTERS: baseUrl + "/XMII/Illuminator?QueryTemplate="+projectName+ 
 				  "/ResourceStatus_RealtimeDashboard/QUERY/getWorkCenter&IsTesting=T&Content-Type=text/json&Param.1=", 
 				
                                           //拉线接口get 
 				XLZ_LINES: baseUrl + "/XMII/Illuminator?QueryTemplate=" + projectName+ 
                                            "/ResourceStatus_RealtimeDashboard/QUERY/getLineArea&IsTesting=T&Content-Type=text/json&Param.1=#{WORK_CENTER}#&Param.2=",
 				

                                           //设备类型接口get 
 				XLZ_RESOURCE_TYPES: baseUrl + "/XMII/Illuminator?QueryTemplate="+projectName+
 				  "/ResourceStatus_RealtimeDashboard/QUERY/getResourceType&IsTesting=T&Content-Type=text/json&Param.1=", 

 				//设备编码接口get 
 				XLZ_RESOURCE_CODES: baseUrl + "/XMII/Illuminator?QueryTemplate=" + projectName+
                                             "/ResourceStatus_RealtimeDashboard/QUERY/getResource&IsTesting=T&Content-Type=text/json&Param.1=#{WORK_CENTER}#&Param.2=#{LINE}#&Param.3=#{TYPE}#&Param.4=",


 				//sitelist all sites 
				SITE_LIST: baseUrl + "/XMII/Illuminator?QueryTemplate="+projectName+
                                              "/ResourceStatus_RealtimeDashboard/QUERY/getSite&Content-Type=text/json&Param.1="

			},
			getDescByExceptionCode: __getDescByExceptionCode
 		};

 		function get(opt){ 
 			var config = { 
                timeout: 30000
            }; 
            var startTime = new Date().getTime();
 			var isTimeout = false; 
 			var isSessionOut = false;
	        var delay = $q.defer(); 
	        var url = opt.url;
	        url = url.replace(/undefined/g,"").replace(/null/g,"");
	        $http 
	        	.get(url, config) 
	        	.success(function (data, status, headers, config){ 
	        		// console.log("success  url: "+url);
	        		var endtime = new Date().getTime(); 
	        		isTimeout = (endtime - startTime) > config.timeout ? true : false; 
	        		if (status == 200) { 
		            	var returnDatas = {
		                	myHttpConfig: {
		                		isTimeout: isTimeout,
		                		isSessionOut: isSessionOut,
		                		status: status
		                	},	
		                    headers: headers,
		                    config: config,
		                    response: data 
		            	}; 
		            	// console.log(returnDatas); 
		                delay.resolve(returnDatas); 
		            }else {
		            	var errorDatas = {
		            		myHttpConfig: {
		            			isTimeout: isTimeout,
		                		isSessionOut: isSessionOut,
		                		status: status,
		                		statusDesc: getResponseStatusDesc(status)
		            		},
		                    headers: headers,
		                    config: config,
		                    response: data
		                };
		                delay.reject(errorDatas);
		            }

	        	})
	        	.error(function (data, status, headers, config){
	        		var endtime = new Date().getTime();
	        		isTimeout = (endtime - startTime) > config.timeout ? true : false;
	        		var errorDatas = {
		        		myHttpConfig: {
		        			isTimeout: isTimeout,
		                	isSessionOut: isSessionOut,
		                	status: status,
		                	statusDesc: getResponseStatusDesc(status)
		        		},
		                headers: headers,
		                config: config,
		                response: data
		            };
		            delay.reject(errorDatas);
	        	});
	        return delay.promise; 
 		} 

 		function post(opt) { 
 			/*{ 
				url: '', 
				paras: { } 
 			}*/
 			var config = {
                timeout: 30000,
                Authorization: 'Basic aW50ZWdyYXRvcjpkZXY='
            };
            var startTime = new Date().getTime();
 			var isTimeout = false;
 			var isSessionOut = false;
	        var delay = $q.defer();
	        //"_request_data=" + encodeURIComponent( $filter('json')({parameter: opt.para}) )
	        $http.post(
	            opt.url,
	            opt.paras,
	            config
	        )
	        .success(function (data, status, headers, config) {
	        	var endtime = new Date().getTime();
	        	isTimeout = (endtime - startTime) > config.timeout ? true : false;
	            if (status == 200) { 
	            	var returnDatas = {
	                	myHttpConfig: {
	                		isTimeout: isTimeout,
	                		isSessionOut: isSessionOut,
	                		status: status
	                	},
	                    headers: headers,
	                    config: config,
	                    response: data 
	            	}; 
	            	// console.log(returnDatas); 
	                delay.resolve(returnDatas); 
	            }else {
	            	var errorDatas = {
	            		myHttpConfig: {
	            			isTimeout: isTimeout,
	                		isSessionOut: isSessionOut,
	                		status: status,
		                	statusDesc: getResponseStatusDesc(status)
	            		},
	                    headers: headers,
	                    config: config,
	                    response: data
	                };
	                delay.reject(errorDatas);
	            } 
	        })
	        .error(function (data, status, headers, config) {
					//var errorMessage = (headers("error-message"));
					//errorMessage = eval("(" + errorMessage + ")");
					//errorMessage = getResponseErrorCode(errorMessage);
					//errorMessage = errorMessage.code;
					
					//console.log(errorMessage);
					//console.log(errorMessages[getResponseErrorCode(headers("error-message")).code]);
				var errorMessage = 	errorMessages[getResponseErrorCode(headers("error-message")).code];
	        	var endtime = new Date().getTime();
	        	isTimeout = (endtime - startTime) > config.timeout ? true : false;
	        	var errorDatas = {
	        		myHttpConfig: {
	        			isTimeout: isTimeout,
	                	isSessionOut: isSessionOut,
	                	status: status,
		                statusDesc: getResponseStatusDesc(status),
						errorMessage:errorMessage,
	        		},
	                headers: headers,
	                config: config,
	                response: data
	            };
	            delay.reject(errorDatas);
	        });
	        return delay.promise;
	    }

			function getResponseErrorCode(statusCode){
				return eval("("+statusCode+")");
			};

		function __getDescByExceptionCode(code){
			var desc = code;
			for(var key in errorMessages){
				if(key == code){
					return errorMessages[key];
				}
			}	
	    	return desc;
		}		

	    function getResponseStatusDesc(statusCode){
	    	var desc = "未知错误响应码: "+statusCode;
	    	for(var i = 0; i < responseStatus.length; i++){
	    		if(statusCode == responseStatus[i].code){
	    			return responseStatus[i].desc;
	    		}
	    	}
	    	return desc;
	    }

 	}]);



utilsModule.service('homeService', ['HttpAppService', 'plcService', 
                                               function (HttpAppService,   plcService) {
    return{
        siteList : requestSiteList,
        setCurrentFactory : setCurrentFactory,
        factoryCode : null
    };
	function requestSiteList(){
                                console.log("userId:   "+ window.urlParams.userId);
                                var userId = window.urlParams.userId;
			var url = HttpAppService.URLS.SITE_LIST + userId;
		           console.log(url);
			return HttpAppService.get({
				url: url
			});
	};

          function setCurrentFactory(name) {
		this.factoryCode = name;
                      console.log("home service set factory");	
		plcService.setFactoryName(this.factoryCode);
	}



}]);