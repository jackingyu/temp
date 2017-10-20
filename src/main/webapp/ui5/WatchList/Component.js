jQuery.sap.declare("fmg.conmon.watchlist.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");


sap.ui.core.UIComponent.extend("fmg.conmon.watchlist.Component", {
  metadata: {
    name: "fmg.conmon.watchlist",
    version: "1.0",
    dependencies: {
      libs: [
        "sap.m", "sap.ui.layout"
      ],
      components: []
    },

    rootView: "fmg.conmon.watchlist.views.Root",
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
        viewPath: "fmg.conmon.watchlist.views",
        targetAggregation: "pages",
        targetControl: "mainContent",
        clearTarget: false
      },
      routes: [
        {
        	pattern: "",
        	name: "WatchList",
        	view: "WatchList",
        	viewId: "WatchList",
        },{
          pattern: ":all*:",
          name: "defaultWatchListPage",
          view: "WatchList",
          viewId: "WatchList"
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
      id: "watchListApp",
      viewName: "fmg.conmon.watchlist.views.App",
      type: "XML",
      viewData: {
        component: this
      }
    });

    
    var rootPath = jQuery.sap.getModulePath("fmg.conmon.watchlist");
    // set i18n model
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl: rootPath + "/i18n/messageBundle.properties"
    });
    oView.setModel(i18nModel, "i18n");
    this.setModel(i18nModel, "i18n");

    return oView;

  }

});
