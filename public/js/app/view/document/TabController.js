Ext.define('Telasi.view.document.TabController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentTabController',

  openTab: function(component) {
    if (component){
      var tabcontrol = this.getView();
      if (!tabcontrol.contains(component)){
        tabcontrol.add(component);  
      };
      tabcontrol.setActiveTab(component);
    }
  },

  removeTab: function(component) {
    var tabcontrol = this.getView();
    tabcontrol.remove(component, true);
  },

  refreshDocuments: function() {
    var tabcontrol = this.getView();
    tabcontrol.down('docgrid').down('pagingtoolbar').doRefresh();
  },

});
