Ext.define('Tel100.view.user.box.ButtonViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userboxbutton',

  onLogout: function(item, e, eOpts) {
    var proxyUser = helpers.user.getProxyUser();
    if (proxyUser) {
      var view = this.getView();
      var mainView = view.up('main');
      helpers.user.setProxyUser(null);
      mainView.getViewModel().set('proxyUser', null);
      mainView.fireEvent('proxychanged');
    } else {
      window.location.reload();
    }
  },

  onSwitch: function(item, e, eOpts) {
    var view = this.getView();
    var dialog = Ext.create('Tel100.view.user.switch.Dialog', { modal: true });
    dialog.on('switchuser', function(userRec) {
      dialog.close();
      // console.log(userRec);
      helpers.user.setProxyUser(userRec);
      var mainView = view.up('main');
      mainView.getViewModel().set('proxyUser', userRec);
      mainView.fireEvent('proxychanged');
    });
    dialog.show();
  },

  onProfile: function(item, e, eOpts) {
    var view = this.getView();
    var dialog = Ext.create('Tel100.view.user.profile.Dialog', { modal: true });
    var user = this.getViewModel().get('currentUser');
    dialog.getViewModel().set('currentUser', Ext.clone(user));
    dialog.show();
  }
});
