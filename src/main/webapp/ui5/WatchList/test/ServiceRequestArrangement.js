  jQuery.sap.declare("fmg.conmon.threeaccounts.test.ServiceRequestArrangement");
  jQuery.sap.require("sap.ui.test.Opa5");
  jQuery.sap.require("sap.ui.test.opaQunit");

  fmg.conmon.threeaccounts.test.ServiceRequestArrangement = sap.ui.test.Opa5.extend("fmg.conmon.threeaccounts.test.ServiceRequestArrangement", {
    iStartMyApp: function (bOnlyMock) {       
      return this.iStartMyAppInAFrame("../index.html");         
    }

  });