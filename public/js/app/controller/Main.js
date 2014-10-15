Ext.define('Telasi.controller.Main', {
  extend: 'Ext.app.Controller',

  views: [
    'user.Login@Telasi.view',
    'user.LoginController@Telasi.view',
  ],

  models: [
    'sys.User@Telasi.model',
  ],

  init: function() {
    this.control({
      'userlogin': {
        loggedin: function(userData) {
          var user = Ext.create('Telasi.model.sys.User', userData.user);
          console.log(user);
        }
      }
    });
  },
});
