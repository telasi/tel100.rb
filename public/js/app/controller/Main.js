Ext.define('Telasi.controller.Main', {
  extend: 'Ext.app.Controller',

  views: [
    'viewports.Login@Telasi.view',
    'viewports.Main@Telasi.view',
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
    this.control({
      'userlogin': {
        loggedin: function(userData, password) {
          this.login.destroy();
          this.user = Ext.create('Telasi.model.sys.User', userData.user);
          this.viewport = Ext.create('Telasi.view.viewports.Main', {
            viewModel: {
              data: {
                currentUser: this.user
              }
            }
          });
          Ext.Ajax.setExtraParams( { api_username: userData.user.username, api_password: password } );
        }
      },
      'userbox': {
        loggedout: function() {
          this.viewport.destroy();
          this.user = null;
          this.login = Ext.create('Telasi.view.viewports.Login');
          Ext.Ajax.setExtraParams( { api_username: undefined, api_password: undefined } );
        },
      }
    });
  },
});
