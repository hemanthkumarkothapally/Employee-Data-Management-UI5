sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.trail.ui5trail.controller.View3", {
        onInit() {
            let oData = new sap.ui.model.json.JSONModel({
                displayitems: false,
                employeedata: {
                    Title: "",
                    FirstName: "",
                    LastName: "",
                    BirthDate: "",
                    Address: "",
                    City: "",
                    Country: "",
                    Department: "",
                    HireDate: ""
                }
            })
            this.getView().setModel(oData);
        },
        onsaveform: function () {
            let oView = this.getView();
            let formtittle = oView.byId("formtittleID")._getSelectedItemText();
            let formfirstname = oView.byId("formfirstnameID").getValue();
            let formlastname = oView.byId("formlastnameID").getValue();
            let formbirthdate = oView.byId("formbirthdateID").getValue();
            let formaddress = oView.byId("formaddressID").getValue();
            let formcity = oView.byId("formcityID").getValue();
            let formcountry = oView.byId("formcountryID").getValue();
            let formdepartment = oView.byId("formdepartmentID").getValue();
            let formhiredate = oView.byId("formhiredateID").getValue();
            if (!formtittle || !formfirstname || !formlastname || !formbirthdate || !formaddress || !formcity || !formcountry || !formdepartment || !formhiredate) {
                MessageBox.warning("Enter All Mandatory Fields..");

            }
            else {
                MessageBox.success(formfirstname+" " + formlastname + " Data is sucessfully saved..",{
                    actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction:sap.m.MessageBox.Action.OK,
                    onClose:function(action){
                if(action==sap.m.MessageBox.Action.OK){
                                            let employeeData = oView.getModel().getProperty("/employeedata");
                let displayitems= oView.getModel().getProperty("/displayitems");

                employeeData.Title = formtittle;
                employeeData.FirstName = formfirstname;
                employeeData.LastName = formlastname;
                employeeData.BirthDate = formbirthdate;
                employeeData.Address = formaddress;
                employeeData.City = formcity;
                employeeData.Country = formcountry;
                employeeData.Department = formdepartment;
                employeeData.HireDate = formhiredate;

                oView.getModel().setProperty("/employeedata", employeeData);
                oView.byId("submitbuttonID").setEnabled(!displayitems);
                oView.byId("formsavebuttonID").setVisible(displayitems);
                oView.byId("formeditbuttonID").setVisible(!displayitems);
                oView.getModel().setProperty("/displayitems", true);
                }
                    }.bind(this)
                });
                // let employeeData = oView.getModel().getProperty("/employeedata");
                // let displayitems= oView.getModel().getProperty("/displayitems");

                // employeeData.Title = formtittle;
                // employeeData.FirstName = formfirstname;
                // employeeData.LastName = formlastname;
                // employeeData.BirthDate = formbirthdate;
                // employeeData.Address = formaddress;
                // employeeData.City = formcity;
                // employeeData.Country = formcountry;
                // employeeData.Department = formdepartment;
                // employeeData.HireDate = formhiredate;

                // oView.getModel().setProperty("/employeedata", employeeData);
                // oView.byId("submitbuttonID").setEnabled(!displayitems);
                // oView.byId("formsavebuttonID").setVisible(displayitems);
                // oView.byId("formeditbuttonID").setVisible(!displayitems);
                // oView.getModel().setProperty("/displayitems", true);
            }
            

        },
        oneditform: function () {
            MessageBox.success(" Do You Want To Edit ..",{
                actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
                emphasizedAction:sap.m.MessageBox.Action.OK,
                onClose:function(action){
            if(action==sap.m.MessageBox.Action.OK){
            let oView = this.getView();
            let displayitems= oView.getModel().getProperty("/displayitems");
            oView.byId("submitbuttonID").setEnabled(!displayitems);
            oView.byId("formsavebuttonID").setVisible(displayitems);
            oView.byId("formeditbuttonID").setVisible(!displayitems);
            oView.getModel().setProperty("/displayitems", false);
                }
         }.bind(this) });

        },
        onSubmitform: function(){
            MessageBox.success(" Do You Want To Submit..",{
                actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
                emphasizedAction:sap.m.MessageBox.Action.OK,
                onClose:function(action){
            if(action==sap.m.MessageBox.Action.OK){
            
            let newemploye = this.getView().getModel().oData.employeedata;
            var sBaseUrl = sap.ui.require.toUrl("com/trail/ui5trail");

            $.ajax({
                url:sBaseUrl+"/odata/v4/edmservice/Employees",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify(newemploye),
                success: function(data) {
                    MessageToast.show("Successfully submitted data");
                  },
                  error: function(error) {
                    MessageToast.show("Error submitting data");
                  }
            })
            console.log(newemploye);


            let oView = this.getView();
            oView.byId("formtittleID").setSelectedKey("")
            oView.byId("formfirstnameID").setValue("");
            oView.byId("formlastnameID").setValue("");
            oView.byId("formbirthdateID").setValue("");
            oView.byId("formaddressID").setValue("");
            oView.byId("formcityID").setValue("");
            oView.byId("formcountryID").setValue("");
            oView.byId("formdepartmentID").setValue("");
            oView.byId("formhiredateID").setValue("");

            let displayitems= oView.getModel().getProperty("/displayitems");
            oView.byId("submitbuttonID").setEnabled(!displayitems);
            oView.byId("formsavebuttonID").setVisible(displayitems);
            oView.byId("formeditbuttonID").setVisible(!displayitems);
            oView.getModel().setProperty("/displayitems", false);

            sap.ui.core.BusyIndicator.show(0);
            this.getOwnerComponent().getRouter().navTo("TargetView2",{refresh:true});
                        setTimeout(() => {
                            sap.ui.core.BusyIndicator.hide();
                        }, 800);
            
            
        }
    }.bind(this) });

        },
        onGotoTable: function () {
            sap.ui.core.BusyIndicator.show(0);
                        setTimeout(() => {
                            sap.ui.core.BusyIndicator.hide();
                        }, 800);
            this.getOwnerComponent().getRouter().navTo("TargetView2");
        }
    });
});