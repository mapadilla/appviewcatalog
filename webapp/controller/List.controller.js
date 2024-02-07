sap.ui.define([
    "./Base.controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.List", {
            onInit: function () {
            },

            onPressProduct: function(oEvent){
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProduct").getObject();
                
                let prodIdx = this.getView().getModel("mProduct").getData().ProductCollection.indexOf(oItem);
                this.onNavTo("DetailView", {
                    productId: prodIdx
                });

            },

            onSearch: function(oEvent){
                let aFilters = [];
                let sQuery = oEvent.getSource().getValue();

                if(sQuery && sQuery.length > 0){
                    let oFilter = new Filter({
                        path: "Name",
                        operator: FilterOperator.Contains,
                        value1: sQuery
                    });
                    aFilters.push(oFilter);
                }

                let oList = this.byId("productList");
                let oBinding = oList.getBinding("items"); 
                oBinding.filter(aFilters);
            }
        });
    });