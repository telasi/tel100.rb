Ext.define('Telasi.view.user.LoginController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userlogin',

  onLogin: function(button) {
    var self = this;
    var loginform = button.up('form');
    if (loginform.isValid()) {
      loginform.setLoading('დაელოდეთ...');
      loginform.submit({
        url: '/api/login',
        success: function(form, action) {
          console.log('SUCCESS:', action.result)
          loginform.setLoading(false);
          self.fireEvent('loggedin', action.result);
        },
        failure: function(form, action) {
          console.log('FAILURE:', action.result)
          loginform.setLoading(false);
          // loginform.fireEvent('onLogin', action.result);
        },
      });
    }
  },
});
