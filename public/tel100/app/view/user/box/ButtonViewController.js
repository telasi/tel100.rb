Ext.define('Tel100.view.user.box.ButtonViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userboxbutton',

  onLogout: function(item, e, eOpts) {
    window.location.reload();
  },

  onSwitch: function(item, e, eOpts) {
    var dialog = Ext.create('Tel100.view.user.switch.Dialog', { modal: true });
    dialog.show();
  }
});
