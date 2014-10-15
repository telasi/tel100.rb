Ext.define('Telasi.controller.Main', {
  extend: 'Ext.app.Controller',

  views: [
    'Login@Telasi.view.user',
    'LoginController@Telasi.view.user',
  ],

  init: function() {
    this.control({
      'userlogin': {
        loggedin: function(userData) {
          // TODO: authorize user
          console.log('logged in!', userData);
        }
      }
    });
  },
});
