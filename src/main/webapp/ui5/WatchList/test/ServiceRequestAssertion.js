(function() {

  "use strict";

  /* global ok, jQuery, insurance, sap */

  jQuery.sap.declare("fmg.conmon.threeaccounts.test.ServiceRequestAssertion");
  jQuery.sap.require("sap.ui.test.Opa5");
  jQuery.sap.require("sap.ui.test.opaQunit");

  fmg.conmon.threeaccounts.test.ServiceRequestAssertion = sap.ui.test.Opa5.extend("fmg.conmon.threeaccounts.test.ServiceRequestAssertion", {
	   //iShouldSeeHandlingProgressTable
	   iShouldSeeHandlingProgressTable: function(sControlId, sViewName) {
	     return this.waitFor({
	       viewName: sViewName,
	       id: sControlId,
	       success: function(oControl) {
	         if (oControl.getItems().length > 0) {
	           bHasItemsToReply= true;
	         }
	       ok (true, "Correct progress table returned");
	       }
	     });
	   },
	   
	   iShouldSeeControlLengthIs: function(sControlId, sViewName,iLength) {

		      return this.waitFor({

		        viewName: sViewName,
		        id: sControlId,
		        success: function(oControl) {
		          ok(oControl.getItems().length == iLength, "The control " + sControlId + "'s length  is " + iLength);
		        }
		      });
		    },
	   
    /**
     * Check that a control is existed
     * 
     * @param {String} sControlId The id of a control (ComboBox or IconTabBar)
     * @param {String} viewName current page view
     * @returns {*} For Chaining
     */
    theControlIsExisted: function(sControlId, viewName) {

      return this.waitFor({
        id: sControlId,
        viewName: viewName,
        success: function(oControl) {
          ok(true, "The control " + sControlId + "is existed");
        },
        errorMessage: "failed to find controlId" + sControlId
      });
    },

    /**
     * Check that a control is visible
     * 
     * @param {String} sControlId The id of a control (ComboBox or IconTabBar)
     * @param {String?} sViewName The view name
     * @param {Boolean?} isVisible Wheather the sControlId is visible in current page.
     * @returns {*} For Chaining
     */
    iShouldSeetheControlIsVisible: function(sControlId, sViewName, isVisible) {
      return this.waitFor({
        viewName: sViewName,
        id: sControlId,
        success: function(oControl) {
          ok(oControl.getVisible() === isVisible, "The control " + sControlId + " in view " + sViewName + " is visible");
        },
        error:function(OControl) {
          ok(oControl.getVisible() === isVisible, "The control " + sControlId + " in view " + sViewName + " is not visible");
        }
      });
    },
    /**
     * Check that a list or table is not empty
     * 
     * @param {String} sControlId The id of a control (ComboBox or IconTabBar)
     * @param {String?} sViewName The view name
     * @returns {*} For Chaining
     */
    theListIsNotEmpty: function(sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function(oList) {
          ok(oList.getItems().length > 0, "The list/table " + sControlId + " is not empty");
        }
      });
    },
    
    iShouldSeeControlByIdIsNotEmpty : function (sControlId,sViewName) {
      return this.waitFor({

        viewName: sViewName,
        id: sControlId,
        success: function(sControl) {
          ok(sControl.getText().length > 0 ,"Date value is correctly setted" );
        },
        errorMessage:"Failed to find control Id:" + sControlId
      });
 
    },
    

    /**
     * Check that a control has a certain value.
     * 
     * @param {String} sValue The expected value. If undefined is passed, the function will use the attribute sValue in the Context
     * @param {String} sControlId The id of a control (ComboBox or IconTabBar)
     * @param {String?} sViewName The view name
     * @returns {*} For Chaining
     */
    theValueIs: function(sValue, sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function(oInput) {
          if (sValue !== undefined) {
            ok(oInput.getValue() === sValue, "The correct value '" + sValue + "' is shown in " + sControlId);
          } else {
            ok(oInput.getValue() === this.getContext().sValue, "The correct value '" + this.getContext().sValue + "' is shown in " + sControlId);
          }
        }
      });
    },
    
    theHeadTitle: function(sValue, sControlId, sViewName) {
        return this.waitFor({
          viewName: sViewName,
          id: sControlId,
          success: function(oInput) {
            if (sValue !== undefined) {
              ok(oInput.getTitle() === sValue, "The correct title '" + sValue + "' is shown in " + sControlId);
            } else {
              ok(oInput.getTitle() === this.getContext().sValue, "The correct tile '" + this.getContext().sValue + "' is shown in " + sControlId);
            }
          }
        });
      },

    /**
     * Check that a control has a certain text.
     * 
     * @param {String} sText The expected text. If undefined is passed, the function will use the attribute sText in the Context
     * @param {String} sControlId The id of a control (ComboBox or IconTabBar)
     * @param {String?} sViewName The view name
     * @returns {*} For Chaining
     */
    theTextIs: function(sText, sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function(oInput) {
          if (sText !== undefined) {
            ok(oInput.getText() === sText, "The correct value '" + sText + "' is shown in " + sControlId);
          } else {
            ok(oInput.getText() === this.getContext().sText, "The correct value '" + this.getContext().sText + "' is shown in " + sControlId);
          }
        }
      });
    },

    /**
     * Check that the application displays a message toast
     * 
     * @param {String?} sViewName The view name
     * @param {String?} sMessageText The text of the MessageToast
     * @returns {*} For Chaining
     */
    theMessageToastIsDisplayed: function(sViewName, sMessageText) {

      return this.waitFor({

        pollingInterval: 100,
        viewName: sViewName,

        check: function() {

          var aMessageToast = sap.ui.test.Opa5.getJQuery()(".sapMMessageToast");
          if (aMessageToast.length === 0) {
            return false;
          }

          // Check that a message toast with the correct text is displayed
          if (sMessageText) {
            for (var iIndex = 0; iIndex < aMessageToast.length; iIndex++) {
              if (aMessageToast[iIndex].childNodes[0].textContent === sMessageText) {
                this.getContext().sMessageText = aMessageToast[0].childNodes[0].textContent;
                return true;
              }
            }
            return false;
          } else {
            this.getContext().sMessageText = aMessageToast[0].childNodes[0].textContent;
            return true;
          }
        },

        success: function() {
          ok(true, "The message '" + this.getContext().sMessageText + "' is displayed");
        }
      });
    },

    /**
     * @param {Function} fnGetData The function that returns the data of the table, e.g. the items or the model
     * @param {Function} fnCompareKey Has to return true if the item should be in the list
     * @param {sap.m.Table} sTableId ID of the table to check
     * @param {String?} sViewName The view name
     * @returns {*} For chaining
     */
    theTableIsFilteredBy: function(fnGetData, fnCompareKey, sTableId, sViewName) {
      return this.waitFor({

        viewName: sViewName,
        id: sTableId,

        success: function(oTable) {
          var iCounter = 0;
          var aData = fnGetData(oTable);

          for (var i = 0; i < aData.length; i++) {
            if (fnCompareKey(aData[i])) {
              iCounter++;
            }
          }

          ok(iCounter === oTable.getItems().length, "The table " + sTableId + " is filtered correctly");
        },
        errorMessage: "Table " + sTableId + " not found"
      });
    },

    testOk: function() {
      ok(true, "passed");
    },

    iShouldSeeADialog: function() {
      return this.waitFor({
        searchOpenDialogs: true,
        controlType: "sap.m.Dialog",
        success: function(aControls) {
          ok(aControls.length > 0, "Dialog has shown up");
        }
      });
    },

    iShouldSeeDialogIsClosed: function(sId, viewName) {
      return this.waitFor({
        id: sId,
        viewName: viewName,
        success: function(controlId) {
          ok(true, "Dialog is closed");
        },
        errorMessage: "Faild to closed a dialog."
      });

    },
    
    iShouldSeeAllCheckBoxIsChecked: function(sViewName,bChecked) {
      var bCorrectState = true;
      return this.waitFor({
        viewName: sViewName,
        controlType: "sap.m.CheckBox",
        success: function(oCheckBoxList) {
          for (var i = 0; i < oCheckBoxList.length; i++) {
            if (oCheckBoxList[i].getSelected() !== bChecked) {
              bCorrectState = false;
              break;
            }
          }
          ok(bCorrectState, "All check box state is correct");
        }
      });
    },
    iShouldSeeAControlIsEnabled: function(sId, sViewName, isEnabled) {
      return this.waitFor({
        id: sId,
        viewName: sViewName,
        success: function(oControl) {
          ok(oControl.getEnabled() === isEnabled, "passed");
        },
        errorMessage: "Failed to find controlId ::" + sId + ":::"
      });
    }
  });

}());
