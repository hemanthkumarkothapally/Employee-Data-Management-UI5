sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.trail.ui5trail.controller.View1", {
        onInit() {
            let oData = {
                captcha:this.getrandomcaptcha(),
                credentials: [
                    {
                        username: "hemanth",
                        password: "hemanth123"
                    },
                    {
                        username: "anil",
                        password: "anil123"
                    },
                    {
                        username: "manasa",
                        password: "manasa123"
                    },
                    {
                        username: "bindu",
                        password: "bindu123"
                    },
                    {
                        username: "sisira",
                        password: "sisira123"
                    }
                ]
            };
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel);
        },
        onsubmitlogin: function () {
            let oView = this.getView();
            let username = oView.byId("usernameid").getValue();
            let password = oView.byId("passwordid").getValue();
            let arandomcaptcha= oView.byId("randomcaptchaId").getText();
            let ainputcaptcha = oView.byId("captchaId").getValue();
            if (!username || !password || !ainputcaptcha) {
                MessageBox.error("Fields are Mandatory");
                return;
            }
            var aCredentials = this.getView().getModel().getProperty("/credentials");
            let usernames = aCredentials.map(function (credentials) {
                return credentials.username
            });
            let passwords = aCredentials.map(function (credentials) {
                return credentials.password
            });
            if (usernames.includes(username) && passwords.includes(password) && ainputcaptcha===arandomcaptcha) {
                oView.byId("usernameid").setValue("");
                oView.byId("passwordid").setValue("");
                MessageBox.success(username + " you are sucessfully logged.",{
                    onClose:function(action){
                        this.getOwnerComponent().getRouter().navTo("TargetView2");

                    }.bind(this)
                
                });
            }
            else {
                MessageBox.warning("Invalid Credentials");
            }
        },
        getrandomcaptcha:function(){
            return Math.floor(Math.random()*10000);
        }
    });
});