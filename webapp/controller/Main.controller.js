sap.ui.define([
    "./Base.controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.Main", {
            onInit: function () {

            },
            onPressTile: function(oEvent){
                let viewRoute  = oEvent.getSource().getBindingContext("mTile").getObject().view;
                this.onNavTo(viewRoute);
            }
        });
    });
