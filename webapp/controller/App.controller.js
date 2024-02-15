sap.ui.define(
    [
      "./Base.controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("appviewcatalog.controller.App", {
        onInit: function() {
          this._initTheme();
        }
      });
    }
  );
  