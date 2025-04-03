sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
], (Controller ,MessageBox , MessageToast,Filter,FilterOperator,FilterType) => {
    "use strict";

    return Controller.extend("com.trail.ui5trail.controller.View2", {
        onInit() {
            
        },
        formatAddress: function(Address,City,Country){
            let aAddress= Address+","+City+","+Country;
            return aAddress;
        },
        onAddemployee:function(){
            this.getOwnerComponent().getRouter().navTo("TargetView3");
        },
        onemployeeselection:function(oEvent){
            let event= oEvent.getParameter("listItem").getBindingContext().getObject().FirstName;
            MessageBox.confirm(event+" do you want to open.",{ onClose: function(action) {
                if(action === MessageBox.Action.OK){    
                    this.getOwnerComponent().getRouter().navTo("TargetView3");
                }
            }.bind(this)});
            
        },
    //     onSearch: function(){
    //         const oComboBox = this.getView().byId("searchfilter");
    // const selectedemployename = oComboBox.getSelectedItem().getKey();
    // console.log("Filtering by ID:", selectedemployename); // Debug

    // // 2. Apply filter (single filter, no array)
    // const oFilter = new Filter("ID", FilterOperator.EQ, selectedemployename);
    // this.getView().byId("employeetable").getBinding("items").filter(oFilter,FilterType.Application);
    //         // let selectedemployename=this.getView().byId("searchfilter").getSelectedItem().getText();
    //         // const aFilter = new Filter("FirstName", FilterOperator.EQ, selectedemployename);
    //         // this.getView().byId("employeetable").getBinding("items").filter(aFilter);
    //     }
    onSearch: function(){
        const oComboBox = this.getView().byId("searchfilter");
        const oSelectedItem = oComboBox.getSelectedItem();
    
        // 1. Check if an item is selected
        if (!oSelectedItem) {
            MessageToast.show("Please select an employee to filter.");
            return;
        }
    
        // 2. Get selected employee ID
        const selectedEmployeeID = oSelectedItem.getKey();
        console.log("Filtering by ID:", selectedEmployeeID); // Debug
    
        // 3. Apply filter to the table
        const oTable = this.getView().byId("employeetable");
        const oBinding = oTable.getBinding("items");
    
        if (oBinding) {
            const oFilter = new Filter("ID", FilterOperator.EQ, selectedEmployeeID);
            oBinding.filter([oFilter], FilterType.Application);
        }
    }
    
    });
});