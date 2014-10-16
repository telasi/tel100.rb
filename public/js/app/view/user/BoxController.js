Ext.define('Telasi.view.user.BoxController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userbox',

  onLogout: function(button) {
    button.up('userbox').fireEvent('loggedout');
  },

  onProfile: function(button) {
    console.log('TODO: call profile editor');
  },
});
