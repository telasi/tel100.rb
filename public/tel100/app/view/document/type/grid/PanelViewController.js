Ext.define('Tel100.view.document.type.grid.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenttypegridpanel',

  onRefresh: function(tool, e, owner, eOpts) {
    this.getViewModel().getStore('types').load();
  }

});
