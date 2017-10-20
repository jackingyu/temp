sap.ui.define([ ], 
  function() {

  var Utils = function() {

  };


  Utils.prototype.initLoadEmployee = function(controller) {
	 return;
    console.log("Utils init function");
    //console.log(controller);

    var sUrl= "/mhp-oee/auth/logon_user";
    //console.log(sUrl);
    $.ajax({
        url:sUrl,
        async:true,
        type: "GET",
        contentType: "application/json",
 //     data: sMessage,
        timeout: 1000
    }).done(function(data){
        controller.setEmployeeData(data);
    });
  };

  Utils.prototype.loadSitelist = function(user, controller){
	  return;
      console.log("loadSitelist  " + user);
      var request = "userId=" + user;
      var sUrl= "/mhp-oee/auth/site/user_sitelist";
      $.ajax({
          url:sUrl,
          async:true,
          type: "GET",
          contentType: "application/json",
          data: request,
          timeout: 1000
      }).done(function(data){
          console.log(data);
          //controller.setEmployeeData(data);
      });
  };

  Utils.prototype.loadAuth = function(site, controller) {
	  return;
      console.log("loadAuth  " + site);
      var sUrl= "/mhp-oee/auth/management/site/" + site;
      $.ajax({
          url:sUrl,
          async:true,
          type: "GET",
          contentType: "application/json",
//        data: request,
//        timeout: 1000
      }).done(function(data){
//        console.log(data.activityVOs);
          controller.showTiles(data.activityVOs);
          //controller.setEmployeeData(data);
      });





  };




  return Utils;

}); 