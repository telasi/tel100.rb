Ext.define('Tel100.view.sys.user.grid.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.sysusergridpanel_controller',

  onRefresh: function(tool, e, owner, eOpts) {
    this.getViewModel().getStore('users').load();
  }
});
