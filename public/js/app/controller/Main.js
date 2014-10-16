Ext.define('Telasi.controller.Main', {
  extend: 'Ext.app.Controller',

  views: [
    'viewports.Login@Telasi.view',
    'viewports.Main@Telasi.view',
    'user.Login@Telasi.view',
    'user.LoginController@Telasi.view',
  ],

  models: [
    'hr.Employee@Telasi.model',
    'hr.Organization@Telasi.model',
    'sys.User@Telasi.model',
  ],

  onLaunch: function() {
    this.login = Ext.create('Telasi.view.viewports.Login');
  },

  init: function() {
    window.Telasi = {};
    this.control({
      'userlogin': {
        loggedin: function(userData) {
          this.login.destroy();
          this.user = Ext.create('Telasi.model.sys.User', userData.user);
          this.viewport = Ext.create('Telasi.view.viewports.Main', {
            viewModel: {
              data: {
                currentUser: this.user
              }
            }
          });
        }
      }
    });
  },
});
