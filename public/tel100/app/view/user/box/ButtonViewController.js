Ext.define('Tel100.view.user.box.ButtonViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userboxbutton',

  onLogout: function(item, e, eOpts) {
    window.location.reload();
  },

  onSwitch: function(item, e, eOpts) {
    var view = this.getView();
    var dialog = Ext.create('Tel100.view.user.switch.Dialog', { modal: true });
    dialog.on('switchuser', function(userRec) {
      dialog.close();
      // console.log(userRec);
      helpers.user.setProxyUser(userRec);
      view.up('main').getViewModel().set('proxyUser', userRec);
    });
    dialog.show();
  }
});
