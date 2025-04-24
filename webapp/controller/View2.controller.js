sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/ui/model/Filter",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Text"
], (Controller, MessageBox, MessageToast, Filter, Dialog, Button, library, Text) => {
    "use strict";

    return Controller.extend("com.trail.ui5trail.controller.View2", {
        onInit() {
           
        },
        formatAddress: function (Address, City, Country) {
            let aAddress = Address + "," + City + "," + Country;
            return aAddress;
        },
        onAddemployee: function () {
            sap.ui.core.BusyIndicator.show(0);
                        setTimeout(() => {
                            sap.ui.core.BusyIndicator.hide();
                        }, 500);
            this.getOwnerComponent().getRouter().navTo("TargetView3");
        },
        ongoSearch: function () {
            const oComboBox = this.getView().byId("searchfilter");
            const oSelectedItem = oComboBox.getSelectedItem();
            const sSelectedName = oSelectedItem.getKey(); // This is the FirstName
            console.log("Selected name:", sSelectedName);

            const oFilter = new sap.ui.model.Filter('ID', sap.ui.model.FilterOperator.EQ, sSelectedName);

            const oTableBinding = this.getView().byId("employeetable").getBinding("items");

            if (oTableBinding) {
                oTableBinding.filter([oFilter]);
            } else {
                console.warn("Table binding not found.");
            }
        },
        onemployeepress: function (oEvent) {
            MessageBox.confirm("Do you want to Edit or Delete the record..", {
                actions: ["Edit", "Delete", sap.m.MessageBox.Action.CANCEL],
                emphasizedAction: "Edit",
                onClose: function (action) {
                    let aSelectedrecord = oEvent.getSource().oBindingContexts.undefined.sPath;
                    console.log(aSelectedrecord);
                    if (action == "Edit") {
                        // var sBaseUrl = sap.ui.require.toUrl("com/trail/ui5trail");
                        // $.ajax({
                        //     url: sBaseUrl + "/odata/v4/edmservice" + aSelectedrecord,
                        //     method: "GET",
                        //     dataType: "json",
                        //     success: function (data) {
                        //         console.log(data);
                        //     }
                        // });
                        let aSelectedRecord = oEvent.getSource().getBindingContext().getObject();
                        let afragmentformModel = this.getOwnerComponent().getModel("fragmentformModel");
                        afragmentformModel.setData(aSelectedRecord);

                        if (!this.fragment) {
                            this.fragment = sap.ui.xmlfragment("com.trail.ui5trail.view.aform", this);
                            this.getView().addDependent(this.fragment);
                        }
                        this.fragment.open();
                    }
                    if (action == "Delete") {
                        var sBaseUrl = sap.ui.require.toUrl("com/trail/ui5trail");
                        console.log(sBaseUrl);
                        $.ajax({
                            url: sBaseUrl + "/odata/v4/edmservice" + aSelectedrecord,
                            method: "DELETE"
                        });
                        MessageToast.show("Deleted Sucessfully");
                        this.byId("employeetable").getBinding("items").refresh();

                    }
                }.bind(this)
            });

        },
        onUpdateData: function () {

            this.fragment.close();
            let updatedData=this.getOwnerComponent().getModel("fragmentformModel").getData();
            var sBaseUrl = sap.ui.require.toUrl("com/trail/ui5trail");

            $.ajax({
                url:sBaseUrl+"/odata/v4/edmservice/Employees("+ updatedData.ID +")",
                method:"PUT",
                contentType:"application/json",
                data:JSON.stringify(updatedData),
                success: function(data) {
                    MessageToast.show("Successfully Updated");
                  },
                  error: function(error) {
                    MessageToast.show("Error submitting data");
                  }
            });
            this.byId("employeetable").getBinding("items").refresh();
            
        },
        oncancel:function(){
            this.fragment.close();
        }

    });
});