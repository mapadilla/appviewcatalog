sap.ui.define([
    "./Base.controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, Filter, FilterOperator, MessageBox) {
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
            },

            onOpenDialog: function(oEvent){
                this.fDialog ??= this.loadFragment({
                    name: "appviewcatalog.view.fragments.DialogForm"
                });

                this.fDialog.then((oDialog)=> oDialog.open());
            },

            onReject: function(){
                this.clearNavBack();
            },

            clearInputs: function(){
                this.getById("txtProductId").setValue("");
                this.getById("cmbMainCategory").setValue("");
                this.getById("cmbCategory").setValue("");
                this.getById("txtName").setValue("");
                this.getById("txtDescription").setValue("");
                this.getById("txtSupplier").setValue("");
                this.getById("txtWeightMeasure").setValue("");
                this.getById("rbgWeightUnit").setSelectedIndex(0);
                this.getById("dtSale").setValue("");
                this.getById("swtStatus").setState(true);
                this.getById("txtQuantity").setValue("");
                this.getById("rbgCurrency").setSelectedIndex(0);
                this.getById("txtPrice").setValue("");            
            },

            clearNavBack: function(){
                this.clearInputs();
                this.byId("frgDialogForm").close();
            },

            onSubmit: function() {
                const _this = this;

                let nValidatedFields = this.validateFields();
                if(nValidatedFields){
                    return;
                }

                let oNewProduct = this.getValues();

                let arrProductColl = this.getView().getModel("mProduct").getData().ProductCollection;
                arrProductColl.unshift(oNewProduct);
                this.getView().getModel("mProduct").refresh();

                MessageBox.success("Product Added", {
                    actions: [MessageBox.Action.OK],
                    emphazisedAction: MessageBox.Action.OK,
                    onClose: function(){
                        _this.clearNavBack();
                    }
                });
            },

            validateFields: function(){
                var aForms = ["frmGeneral", "frmWeight", "frmDetails"];
                var aValidated = [];

                aForms.forEach(oForm=>{
                    let aFormElements = this.getById(oForm).getFormContainers()[0].getFormElements();
                    aFormElements.forEach(oFormElement=>{
                        let aFields = oFormElement.getFields();
                        aFields.forEach(oField=>{
                            if(oField.getValue){
                                let sFieldId = oField.getId().split("List--")[1];
                                let valid = oField.getValue() !== "" ? true : false;

                                if(!valid){
                                    aValidated.push({fieldId:sFieldId, state:valid});
                                    this.getById(sFieldId).setValueState("Error");;
                                }
                            }
                        })
                    })
                });
                return aValidated.length;
            },

            getValues: function() {
                let productId = this.getById("txtProductId").getValue();
                let mainCategory = this.getById("cmbMainCategory").getValue();
                let category = this.getById("cmbCategory").getValue();
                let name = this.getById("txtName").getValue();
                let description = this.getById("txtDescription").getValue();
                let supplier = this.getById("txtSupplier").getValue();
                let weightMeasure = parseInt(this.getById("txtWeightMeasure").getValue());
                let weightUnit = this.getById("rbgWeightUnit").getSelectedIndex() == 0 ? "KG" : "LB";
                let dateOfSale = this.getById("dtSale").getValue();
                let status = this.getById("swtStatus").getState() ? "Available" : "Not Available";
                let quantity = parseInt(this.getById("txtQuantity").getValue());
                let currencyCode = this.getById("rbgCurrency").getSelectedIndex() == 0 ? "EUR" : "USD";
                let price = parseInt(this.getById("txtPrice").getValue());

                let oNewProduct = {
                    "ProductId": productId,
                    "Category": category,
                    "MainCategory": mainCategory,
                    "TaxTarifCode": "1",
                    "SupplierName": supplier,
                    "WeightMeasure": weightMeasure,
                    "WeightUnit": weightUnit,
                    "Description": description,
                    "Name": name,
                    "DateOfSale": dateOfSale,
                    "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1257.jpg",
                    "Status": status,
                    "Quantity": quantity,
                    "UoM": "PC",
                    "CurrencyCode": currencyCode,
                    "Price": price,
                    "Width": 48,
                    "Depth": 31,
                    "Height": 4.5,
                    "DimUnit": "cm"
                };

                return oNewProduct;            
            }
        });
    });