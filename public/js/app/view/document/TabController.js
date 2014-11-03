Ext.define('Telasi.view.document.TabController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentTabController',

  openTab: function(component) {
    var tabcontrol = this.getView();
    tabcontrol.add(component);
    tabcontrol.setActiveTab(component);
  },

  removeTab: function(component) {
    var tabcontrol = this.getView();
    tabcontrol.remove(component, true);
  },

});
