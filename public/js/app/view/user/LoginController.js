Ext.define('Telasi.view.user.LoginController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userlogin',

  onLogin: function(button) {
    var loginform = button.up('form');
    if (loginform.isValid()) {
      loginform.setLoading('დაელოდეთ...');
      loginform.submit({
        url: '/api/login',
        success: function(form, action) {
          loginform.setLoading(false);
          loginform.fireEvent('loggedin', action.result);
        },
        failure: function(form, action) {
          loginform.setLoading(false);
        },
      });
    }
  },
});
