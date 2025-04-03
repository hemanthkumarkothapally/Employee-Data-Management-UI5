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
                    tittle: "",
                    firstname: "",
                    lastname: "",
                    birthdate: "",
                    address: "",
                    city: "",
                    country: "",
                    department: "",
                    hiredate: ""
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
                MessageBox.success(formfirstname+" " + formlastname + " Data is sucessfully saved..");
                let employeeData = oView.getModel().getProperty("/employeedata");
                let displayitems= oView.getModel().getProperty("/displayitems");

                employeeData.tittle = formtittle;
                employeeData.firstname = formfirstname;
                employeeData.lastname = formlastname;
                employeeData.birthdate = formbirthdate;
                employeeData.address = formaddress;
                employeeData.city = formcity;
                employeeData.country = formcountry;
                employeeData.department = formdepartment;
                employeeData.hiredate = formhiredate;

                oView.getModel().setProperty("/employeedata", employeeData);
                oView.byId("submitbuttonID").setEnabled(!displayitems);
                oView.byId("formsavebuttonID").setVisible(displayitems);
                oView.byId("formeditbuttonID").setVisible(!displayitems);
                oView.getModel().setProperty("/displayitems", true);
            }
            

        },
        oneditform: function () {
            let oView = this.getView();
            let displayitems= oView.getModel().getProperty("/displayitems");
            oView.byId("submitbuttonID").setEnabled(!displayitems);
            oView.byId("formsavebuttonID").setVisible(displayitems);
            oView.byId("formeditbuttonID").setVisible(!displayitems);
            oView.getModel().setProperty("/displayitems", false);

        },
        onSubmitform: function(){

        },
        onGotoTable: function () {
            this.getOwnerComponent().getRouter().navTo("TargetView2");
        }
    });
});