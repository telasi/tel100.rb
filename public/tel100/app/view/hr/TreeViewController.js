Ext.define('Tel100.view.hr.TreeViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.hrtree',

  onRefresh: function(tool, e, owner, eOpts) {
    this.getView().getStore().load();
  }
});
