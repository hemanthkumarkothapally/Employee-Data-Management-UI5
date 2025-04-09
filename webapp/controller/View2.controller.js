sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter"
], (Controller, MessageBox, MessageToast, Filter) => {
    "use strict";

    return Controller.extend("com.trail.ui5trail.controller.View2", {
        onInit() {

        },
        formatAddress: function (Address, City, Country) {
            let aAddress = Address + "," + City + "," + Country;
            return aAddress;
        },
        onAddemployee: function () {
            this.getOwnerComponent().getRouter().navTo("TargetView3");
        },
        onemployeeselection: function (oEvent) {
            let event = oEvent.getParameter("listItem").getBindingContext().getObject().FirstName;
            MessageBox.confirm(event + " do you want to open.", {
                onClose: function (action) {
                    if (action === MessageBox.Action.OK) {
                        this.fragment=sap.ui.xmlfragment("com.trail.ui5trail.view.form",this);
                        this.getView().addDependent(this.fragment);
                        this.fragment.open();
                    }
                }.bind(this)
            });

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
        // onselectingname: function () {
        //     const aSelectedComboBox = this.getView().byId("searchfilter").getSelectedItem().getText();
        //     // const aSelectedComboBox = this.getView().byId("searchfilter").getValue();

        //     let aFilter = new Filter({
        //         path: 'FirstName',
        //         operator: "EQ",
        //         value1: aSelectedComboBox

        //     });

        //     let aTablebindingcontent = this.getView().byId("employeetable").getBinding("items");

        //     console.log(aTablebindingcontent);
        //     aTablebindingcontent.filter([aFilter]);

        // }
        ongoSearch: function () {
            const oComboBox = this.getView().byId("searchfilter");
            const oSelectedItem = oComboBox.getSelectedItem();
        
            if (!oSelectedItem) {
                console.warn("No ComboBox item selected.");
                return;
            }
        
            const sSelectedName = oSelectedItem.getKey(); // This is the FirstName
            console.log("Selected name:", sSelectedName);
        
            const oFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, sSelectedName);
        
            const oTableBinding = this.getView().byId("employeetable").getBinding("items");
        
            if (oTableBinding) {
                oTableBinding.filter([oFilter]);
            } else {
                console.warn("Table binding not found.");
            }
        }
        
    });
});