Ext.define('Telasi.view.user.BoxController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userbox',
  requires: [
    'Telasi.view.user.ProfileWindow'
  ],

  onLogout: function(button) {
    button.up('userbox').fireEvent('loggedout');
  },

  onProfile: function(button) {
    var profile = Ext.create('Telasi.view.user.ProfileWindow');
    profile.show();
  },
});
