sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/m/MessageToast"
], (Controller ,MessageBox , MessageToast) => {
    "use strict";

    return Controller.extend("com.trail.ui5trail.controller.View1", {
        onInit() {
        },
        onsubmitlogin: function(){
            let oView= this.getView();
            let username = oView.byId("usernameid").getValue();
            let password = oView.byId("passwordid").getValue();
            if(!username || !password){
                MessageBox.error("Fields are Mandatory");     
                return;
            }
            if(username==="hemanth" && password==="hemanth123"){
                MessageBox.success(username + " you are sucessfully logged.");
                // this.getOwnerComponent().getRouter().navTo("TargetView2");
            }
            else{
                MessageBox.warning("Invalid Credentials");
            }
        }
    });
});