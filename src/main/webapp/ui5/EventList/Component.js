jQuery.sap.declare("fmg.conmon.eventlist.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");


sap.ui.core.UIComponent.extend("fmg.conmon.eventlist.Component", {
  metadata: {
    name: "fmg.conmon.eventlist",
    version: "1.0",
    dependencies: {
      libs: [
        "sap.m", "sap.ui.layout"
      ],
      components: []
    },

    rootView: "fmg.conmon.eventlist.views.Root",
    "includes": ["./css/style.css"],
    config: {
      resourceBundle: "i18n/messageBundle.properties",
      serviceConfig: {
        name: "Northwind",
        serviceUrl: ""
      }
    },

    routing: {
      config: {
        
        viewType: "XML",
        viewPath: "fmg.conmon.eventlist.views",
        targetAggregation: "pages",
        targetControl: "mainContent",
        clearTarget: false
      },
      routes: [
        {
        	pattern: "",
        	name: "EventList",
        	view: "EventList",
        	viewId: "EventList",
        },{
          pattern: ":all*:",
          name: "defaultWatchListPage",
          view: "EventList",
          viewId: "EventList"
        }
      ]
    }
  },

  init: function() {
    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
    
    this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());
    this.getRouter().initialize();

  },

  createContent: function() {
    var mConfig = this.getMetadata().getConfig();
    var oView = sap.ui.view({
      id: "eventListApp",
      viewName: "fmg.conmon.eventlist.views.App",
      type: "XML",
      viewData: {
        component: this
      }
    });

    
    var rootPath = jQuery.sap.getModulePath("fmg.conmon.eventlist");
    // set i18n model
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl: rootPath + "/i18n/messageBundle.properties"
    });
    oView.setModel(i18nModel, "i18n");
    this.setModel(i18nModel, "i18n");

    return oView;

  }

});
