sap.ui.controller("fmg.conmon.watchlist.views.WatchList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf threeaccounts.WatchList
*/
	onInit: function() {
	   this.oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
	   this.oResourceBundle = this.oComponent.getModel("i18n").getResourceBundle();
	   this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	
	},
	
		    
    create: function() {
    	console.log("create");
		var object= {};
	    object.number = this.byId("idStudentNumber").getValue();
	    object.name = this.byId("idStudentName").getValue();
	    object.gender = this.byId("idGender").getValue();
	    object.grade = "Alice";
	    object.class = "2016-12-3";


		var model = sap.ui.getCore().getModel("model");
		model.oData.push(object);
		model.refresh();


		this.byId("idStudentNumber").setValue("");
	    this.byId("idStudentName").setValue("");
	    this.byId("idGender").setValue("");
    },


    _editTrigger:true,

    edit: function() {
    	var that = this;
    	console.log("edit");
    	this.byId("idStudentTable").getItems().forEach(function(row){
    		row.getCells().forEach(function(element){
    			if(that._editTrigger) {
    				element.setEditable(true);
    				
    			} else {
    				element.setEditable(false);
    			}	
    		});
    	});
    	if(this._editTrigger) {
    		this._editTrigger = false;
			this.byId("idEdit").setText("Submit");
			this.byId("idCreate").setEnabled(false);
			
    	} else {
    		this._editTrigger = true;
			this.byId("idEdit").setText("Edit");
			this.byId("idCreate").setEnabled(true);
    	}
    },   
	
	checkValueNotEmpty : function(oInput) {
        var bValueEntered = false;
        if (oInput.getValue() === "") {
          oInput.setValueState(sap.ui.core.ValueState.Error);
        //oInput.setValueStateText(oBundle.getText("mandatoryField"));
        } else {
          oInput.setValueState(sap.ui.core.ValueState.None);
          bValueEntered = true;
        }
        return bValueEntered;
      },
	
	
	//object property
	_data: [{
		"name":"温度跳变",
		"number":"001",
		"gender":"温度跳变",
		"grade":"Tony Shen",
		"class":"2016-12-01"
	},{
		"name":"单体过热",
		"number":"002",
		"gender":"单体过热",
		"grade":"Tony Shen",
		"class":"2016-12-01"
	},{
		"name":"容量保有量",
		"number":"003",
		"gender":"容量保有量",
		"grade":"Tony Shen",
		"class":"2016-12-01"
	},{
		"name":"存放过长时间",
		"number":"004",
		"gender":"存放过长时间",
		"grade":"Tony Shen",
		"class":"2016-12-01"
	}],
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf threeaccounts.WatchList
*/
	onBeforeRendering: function() {	
		var model = new sap.ui.model.json.JSONModel();
		model.setData(this._data);
		sap.ui.getCore().setModel(model, "model"); 
		this.byId("idStudentTable").setModel(model);
		console.log("on before rendering test");
	},

	handleNavHome: function(oEvent) {
      
      var container = sap.ui.getCore().byId("container");
      var mainApp = sap.ui.getCore().getComponent(window.entry);
      var hashChanger = sap.ui.core.routing.HashChanger.getInstance();
      hashChanger.setHash(window.entry);
      container.setComponent(mainApp);

//      console.log("click back");

    },


/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf threeaccounts.WatchList
*/
	onAfterRendering: function() {
	  console.log("on after rendering test");
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf threeaccounts.WatchList
*/
//	onExit: function() {
//
//	}

});