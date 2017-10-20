  jQuery.sap.declare("insurance.threeaccounts.test.ServiceRequestArrangement");
  jQuery.sap.require("sap.ui.test.Opa5");
  jQuery.sap.require("sap.ui.test.opaQunit");

  insurance.threeaccounts.test.ServiceRequestArrangement = sap.ui.test.Opa5.extend("insurance.threeaccounts.test.ServiceRequestArrangement", {
    iStartMyApp: function (bOnlyMock) {       
      return this.iStartMyAppInAFrame("../index.html");         
    }

  });