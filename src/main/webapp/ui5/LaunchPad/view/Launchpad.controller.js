(function() {
  "use strict";
  jQuery.sap.require("sap.ui.core.routing.HashChanger");
  //jQuery.sap.require("fmg.conmon.lpd.util.Utils");
  sap.ui.core.mvc.Controller.extend("fmg.conmon.lpd.view.Launchpad", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created. Can be used to modify the View before it is
     * displayed, to bind event handlers and do other one-time initialization.
     * 
     * @memberOf Search Policy
     */
    onInit: function() {
      console.log("init main");
      var that = this;
      sap.ui.require(['fmg/conmon/lpd/util/Utils'], function(Utils) {
         fmg.conmon.lpd.utils = new Utils();
         fmg.conmon.lpd.utils.initLoadEmployee(that);
      });
      this._busyDialog = sap.ui.xmlfragment("fmg.conmon.lpd.fragments.BusyDialog", this);
//      this.oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
//      this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//      this.oRouter.attachRouteMatched(this.onRouteMatched, this);
    },

/*
    onRouteMatched: function(oEvent) {
        console.log("onRoute Match from Main")
        var oParameters = oEvent.getParameters();
        console.log(oParameters);
//        if (oParameters.name === "Launchpad" || oParameters.name === "defaultPage") {
//            console.log("Launchpad Screen");          
//        }
    },
*/

    setEmployeeData: function(data) {
      console.log(data);
      var model = new sap.ui.model.json.JSONModel();
      model.setData(data);
      sap.ui.getCore().setModel(model);
      //console.log(this.getView());
      this.getView().setModel(model, "employeeModel");
      fmg.conmon.lpd.utils.loadSitelist(data.user, this);
      fmg.conmon.lpd.utils.loadAuth(data.defaultSite, this);
    },

    onBeforeRendering: function() { 
      console.log("on before rendering main");
//      var tileContains = this.byId("tileContains");
//      tileContains.setVisible(false);
      //this._busyDialog.open(); 
    },

    onAfterRendering: function() {  
        console.log("on after rendering main");
        //if(this._authArray) {
//          this.byId("tileContains").setVisible(true);
            this._busyDialog.close(); 
        //}
    },  


    showTiles: function(array) {
        console.log(array);
        this._authArray = array;
        var that = this;
        this._authArray.forEach(function(o) {
              console.log(that.byId(o.activity));
              if(that.byId(o.activity)) {
                that.byId(o.activity).setVisible(true);
              }
        });


//        var tileContains = this.byId("tileContains");
//        tileContains.setVisible(true);
        //this._busyDialog.close();
    },

    pressTile: function(oEvent) {
          var container = sap.ui.getCore().byId("container");
          var tileName = oEvent.getParameter("id").split("--")[1];
          var app = sap.ui.getCore().getComponent(tileName);
          var hashChanger = sap.ui.core.routing.HashChanger.getInstance();
          hashChanger.setHash(tileName);
          container.setComponent(app);
    },
                                    
    handleLogoffPress:function(){
        console.log("log off");
        if(!this._logOutDialog){
            this._logOutDialog = sap.ui.xmlfragment("fmg.conmon.lpd.fragments.LogOutDialog", this);
            this.getView().addDependent(this._logOutDialog);
        }
        this._logOutDialog.open();
    },
                                    
    handleCancelDialog:function(){
        this._logOutDialog.close();
    },
                                    
    handleLogoutPressed:function(oEvent){
        //sap.ui.core.UIComponent.getRouterFor(this).navTo("Login", {}, false);
    },

    handleShowQRCodeScan:function(oEvent){  
    }
                            
  });

}());
