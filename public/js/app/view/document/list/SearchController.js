Ext.define('Telasi.view.document.list.SearchController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.search',

  onDocumentGridFilter: function(){
    var me = this;
    var gridstore = this.getView().up().down('docgrid').getStore();
    var filter = [];
    var form = this.getView().up().down('form').getForm();
    var filter = [];

    if(form.isValid()) {
      gridstore.clearFilter(true);

      form.getFields().each(function(item) {
        if(item.value != null && item.value != 0 && item.value != ""){
          filter.push({id: item.name, property: item.name, value: item.value });
        }
      });

      gridstore.addFilter(filter);
    }
  },

  onDocumentResetFilter: function(){
    var form = this.getView().up().down('form').getForm();
    form.reset();

    var gridstore = this.getView().up().down('docgrid').getStore();
    gridstore.clearFilter();
  }
});
