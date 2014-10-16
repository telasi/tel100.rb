Ext.define('Telasi.view.user.LoginController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userlogin',

  init: function() {
    this.getView().on('afterrender', function() {
      this.getView().down('#userID').focus();
    }, this);
  },

  onLogin: function(button) {
    var loginform = button.up('form');
    if (loginform.isValid()) {
      loginform.setLoading('დაელოდეთ...');
      loginform.down('label').setVisible(false);
      loginform.submit({
        url: '/api/user/login',
        success: function(form, action) {
          loginform.setLoading(false);
          loginform.fireEvent('loggedin', action.result);
        },
        failure: function(form, action) {
          loginform.setLoading(false);
          loginform.down('label').setVisible(true);
        },
      });
    }
  },
});
