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
    var user = button.up('viewport').viewModel.get('currentUser');
    var profile = Ext.create('Telasi.view.user.ProfileWindow', {
      viewModel: {
        data: {
          user: user
        }
      }
    });
    profile.show();
  },
});
