(function () {
  "use strict";

  /*global jQuery, insurance, sap */

  jQuery.sap.declare("fmg.conmon.threeaccounts.test.ServiceRequestAction");
  jQuery.sap.require("sap.ui.test.Opa5");
  jQuery.sap.require("sap.ui.test.opaQunit");

  fmg.conmon.threeaccounts.test.ServiceRequestAction = sap.ui.test.Opa5.extend("fmg.conmon.threeaccounts.test.ServiceRequestAction", {
	
	  
	  iResetAllFilters: function (viewName, controllerArray) {
		    return this.waitFor({
		      viewName: viewName,
		      id: controllerArray,
		      success: function (oControl) {
//		       console.log(oControl);
		       for(var i = 0; i < oControl.length; i++) {
		    	   oControl[i].setValue("");
		       }
		      }
		    });
		   },
		   navDetails: function () {
		     window.history.go(-1);
		   },
    /*
     Generic functions
     */

    /**
     * Select a Key in a ComboBox or an IconTabBar
     *
     * @param {String} sKey        The sKey to select
     * @param {String} sControlId  The id of a control (ComboBox or IconTabBar)
     * @param {String?} sViewName   The view name
     * @returns {*}                For Chaining
     */
    iSelectByKey: function (sKey, sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          oControl.setSelectedKey(sKey);
        }
      });
    },
    
    iLookAtTheScreen: function() {
      return this;
    },
    
    /**
     * Select a control by type (e.g. sap.m.RadioButton).
     *
     * @param {String}   sControlType   The type of the control, e.g. "sap.m.RadioButton"
     * @param {Integer}  iIndex         Index of the control to click
     * @param {Boolean?} bSearchDialog  true if searching in Dialog
     * @param {String?}  sViewName      The name of the view
     * @returns {*}                     For Chaining
     */
    iSelectAControlByType: function (sControlType, iIndex, bSearchDialog, sViewName) {

      return this.waitFor({

        controlType: sControlType,
        viewName: sViewName,
        searchOpenDialogs: bSearchDialog,

        success: function (aControls) {
          aControls[iIndex].setSelected(true);
        }
      });
    },

    /**
     * Tap a control (e.g. a button) by providing the ID (and view name)
     *
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */

    iTapAControlById: function (sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          oControl.$().trigger("tap");
        }
      });
    },

    /**
     * Tap a control (e.g. a Select) by providing the ID (and view name)
     *
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */

    iSelectAControlById: function (sControlId, sViewName,index) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          oControl.getItems()[index].$().trigger("tap");
        }
      });
    },

    /**
     * Tap a control by type (e.g. sap.m.Button).
     *
     * @param {String}   sControlType   The type of the control, e.g. "sap.m.Button"
     * @param {Integer}  iIndex         Index of the control to click
     * @param {Boolean?} bSearchDialog  true if searching in Dialog
     * @param {String?}  sViewName      The name of the view
     * @returns {*}                     For Chaining
     */
    iTapAControlByType: function (sControlType, iIndex, bSearchDialog, sViewName) {

      return this.waitFor({

        controlType: sControlType,
        viewName: sViewName,
        searchOpenDialogs: bSearchDialog,

        success: function (aControls) {
          aControls[iIndex].$().trigger("tap");
        }
      });
    },

    /**
     * Tap a control by text
     *
     * @param {String}   sText          The text of the control
     * @param {String?}  sControlType   The type of the control, e.g. "sap.m.Button"
     * @param {Boolean?} bSearchDialog  true if searching in Dialog
     * @param {String?}  sViewName      The name of the view
     * @returns {*}                    For Chaining
     */
    iTapAControlByText: function (sText, sControlType, bSearchDialog, sViewName) {

      var oSaveAsButton = null;

      this.waitFor({

        searchOpenDialogs: bSearchDialog,
        controlType: sControlType,
        viewName: sViewName,

        check: function (aButtons) {
          return aButtons.filter(function (oButton) {

            if (oButton.getText() !== sText) {
              return false;
            }
            oSaveAsButton = oButton;
            return true;
          });
        },

        success: function () {
          oSaveAsButton.$().trigger("tap");
        },

        errorMessage: "Did not find button" + "sText"
      });
      return this;
    },
    
    /**
     * Tap a control by text
     *
     * @param {String}   sText          The text of the control
     * @param {String?}  sControlType   The type of the control, e.g. "sap.m.Button"
     * @param {Boolean?} bSearchDialog  true if searching in Dialog
     * @param {String?}  sViewName      The name of the view
     * @returns {*}                    For Chaining
     */
    iClickAControlByText: function (sText, sControlType, bSearchDialog, sViewName) {

      var oSaveAsButton = null;

      this.waitFor({

        searchOpenDialogs: bSearchDialog,
        controlType: sControlType,
        viewName: sViewName,

        check: function (aButtons) {
          return aButtons.filter(function (oButton) {

            if (oButton.getText() !== sText) {
              return false;
            }
            oSaveAsButton = oButton;
            return true;
          });
        },

        success: function () {
          oSaveAsButton.$().trigger("click");
        },

        errorMessage: "Did not find button" + "sText"
      });
      return this;
    },

    /**
     * Click a control (e.g. a button) by providing the ID (and view name)
     *
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */
    iClickAControlById: function (sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          oControl.$().trigger("click");
        }
      });
    },

    /**
     * Enter a value into a field (e.g. an input field) by providing the ID (and view name)
     *
     * @param {String}  sValue     The value to enter
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */
    iEnterAValue: function (sValue, sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          oControl.setValue(sValue);
        }
      });
    },

    /**
     * Enter a value by into a control by type (e.g. an input field).
     *
     * @param {String}   sValue         The value to enter
     * @param {String}   sControlType   The type of the control, e.g. "sap.m.InputField"
     * @param {Integer}  iIndex         Index of the control to click
     * @param {Boolean?} bSearchDialog  true if searching in Dialog
     * @param {String?}  sViewName      The name of the view
     * @returns {*}                     For Chaining
     */
    iEnterAValueByType: function (sValue, sControlType, iIndex, bSearchDialog, sViewName) {

      return this.waitFor({

        controlType: sControlType,
        viewName: sViewName,
        searchOpenDialogs: bSearchDialog,

        success: function (aControls) {
          aControls[iIndex].setValue(sValue);
        }
      });
    },

    iEnterAValueByTypeAndTriggerLiveChange: function (sValue, sControlType, iIndex, bSearchDialog, sViewName) {

      return this.waitFor({

        controlType: sControlType,
        viewName: sViewName,
        searchOpenDialogs: bSearchDialog,

        success: function (aControls) {
          aControls[iIndex].setValue(sValue);
          aControls[iIndex].fireLiveChange({newValue: sValue});
        }
      });
    },
    /**
     * Enter a value into a field (e.g. an input field) and trigger live change event by providing the ID (and view name)
     *
     * @param {String}  sValue     The value to enter
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */
    iTriggerLiveChange: function (sValue, sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          oControl.setValue(sValue);
          oControl.fireLiveChange({newValue: sValue});
        }
      });
    },

    /**
     * Tap the Nth entry in a list or table
     *
     * @param {Integer} iIndex     The index of the item (starting with 0)
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */
    iTapTheNthEntryInAList: function (iIndex, sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oList) {
          oList.getItems()[iIndex].trigger("tap");
        }
      });
    },

    /**
     * Trigger the value help of a control
     *
     * @param {String}  sControlId The ID of the control
     * @param {String?} sViewName  The name of the view
     * @returns {*}                For Chaining
     */
    iRequestValueHelp: function (sControlId, sViewName) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        success: function (oControl) {
          // click it
          oControl.fireValueHelpRequest();
        }
      });
    },

    /**
     *
     * @param {Function?}  fnCompareKey  Function has to return true when called with the correct item
     * @param {String}     sControlId    The ID of the control
     * @param {String?}    sViewName     The name of the view
     * @returns {*}                      For chaining
     */
    iClickOnATableLineItem: function (fnCompareKey, sControlId, sViewName ) {

      return this.waitFor({

        viewName: sViewName,
        id: sControlId,

        /**
         * @param {sap.m.Table} oTable    The table
         */
        success: function (oTable) {

          // if we are running on real data, we use the first item. If we run on mock, we search for the specified line
          if (!this.getContext().useMockData() || !fnCompareKey) {
            this.getContext().oSelectedItem = oTable.getItems()[0];
            this.getContext().oSelectedItem.$().trigger("tap");
          } else {

            // Click on the item with the key given by sKey
            var that = this;
            oTable.getItems().some(function (oItem) {
              if (fnCompareKey(oItem)) {
                that.getContext().oSelectedItem = oItem;
                oItem.$().trigger("tap");
                return true;
              }
            });
          }
        }
      });
    },
    
    iClickACollectionItemByIndex : function (sType,iControlIndex,iItemIndex,bSearchOpenDialog,sViewName) {
      return this.waitFor({
        viewName: sViewName,
        controlType:sType ,
        searchOpenDialogs: bSearchOpenDialog,
        success: function(oCollection) {
          oCollection[iControlIndex].getItems()[iItemIndex].$().trigger("tap");
        },
        errorMessage: "Failded to find a sType you entered."           
      });
    },
    
    iFireValueRequestById: function(sControlId, sViewName) {
      return this.waitFor({
        viewName: sViewName,
        id: sControlId,
        success: function(oInput) {
         oInput.fireValueHelpRequest();
        }
      });
    },

    /**
     * Select a sort option in the Sort dialog
     *
     * @param {Boolean}  bAscending Sorting ascending or descending
     * @param {String}   sKey       The key to select
     * @param {String?}  sViewName  The name of the view
     * @returns {*}                 For Chaining
     */
    iSelectSortOption: function (bAscending, sKey, sViewName) {

      return this.waitFor({

        searchOpenDialogs: true,
        viewName: sViewName,

        /**
         * @param {Array} aControls All elements of the Dialog
         */
        success: function (aControls) {

          var oSortOptionButton;

          // the bAscending/descending buttons are below an element called "sortorderlist"
          var aSortOptions = aControls.filter(function (element) {
            return (element.getParent().getId().indexOf("-sortorderlist") > 0);
          });

          // Ascending is the first entry, descending is the second
          if (bAscending) {
            oSortOptionButton = aSortOptions[0];
          } else {
            oSortOptionButton = aSortOptions[1];
          }

          // select it
          oSortOptionButton.$().trigger("tap");

          // then we select the sort attribute. These are elements below an element called "sortlist"
          aControls.some(function (element) {
            if (element.getParent().getId().indexOf("-sortlist") > 0) {
              var control = element.data("item");

              // and if this is the control with the right sKey, we press it
              if (control && control.getKey() === sKey) {
                element.$().trigger("tap");
                return true;
              }
            }
          });

        }
      });
    }

  });
}());
