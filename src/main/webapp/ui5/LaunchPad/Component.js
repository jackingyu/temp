jQuery.sap.declare("fmg.conmon.lpd.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

sap.ui.core.UIComponent.extend("fmg.conmon.lpd.Component", {
  metadata: {
    "name": "fmg.conmon.lpd",
    "version": "1.0",
    "dependencies": {
      "libs": [
        "sap.m", "sap.ui.layout"
      ],
      "components": []
    },
    "includes": [
      "css/style.css"
    ],
    "config": {
      fullWidth: true,
      serviceConfig: {
        name: "Northwind",
      }
    },

    routing: {
      config: {
        routerClass: fmg.conmon.lpd.MyRouter,
        viewType: "XML",
        viewPath: "fmg.conmon.lpd.view", // common prefix,
        targetAggregation: "pages",
        targetControl: "mainContent",
        clearTarget: false
      },
      routes: [
        {
          pattern: "",
          name: "Launchpad",
          view: "Launchpad",
          viewId: "idLaunchpad"
        }, {
          pattern: ":all*:",
          name: "defaultPage",
          view: "Launchpad",
          viewId: "idLaunchpad"
        }
      ]
    }

  },

  init: function() {

    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
    // use absolute path
    this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());
    this.getRouter().initialize();
  },

  createContent: function() {
    var oView = sap.ui.view({
      id: "app",
      viewName: "fmg.conmon.lpd.view.App",
      type: "XML",
      viewData: {
        component: this
      }
    });

    var rootPath = jQuery.sap.getModulePath("fmg.conmon.lpd");
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl: rootPath + "/i18n/messageBundle.properties"
    });
    oView.setModel(i18nModel, "i18n");


    return oView;
  }
});
