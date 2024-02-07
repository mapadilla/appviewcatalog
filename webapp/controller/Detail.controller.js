sap.ui.define([
    "./Base.controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.Detail", {
            onInit: function () {
                this.getRouter().getRoute("DetailView").attachMatched(this._onRouteMatched, this);                
            },

            _onRouteMatched: function(oEvent){
                let oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                oView.bindElement({
                    path: `mProduct>/ProductCollection/${oArgs.productId}`,
                    events: {
                        change: this._onBindingChange.bind(this)
                    }
                })
            },

            _onBindingChange: function(oEvent){
                if(!oEvent.getSource().getBoundContext().getObject()){
                    this.getRouter().getTargets().display("TargetNotFound");
                }
            }
        });
    });
