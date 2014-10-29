Ext.define('Telasi.view.user.LoginController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userlogin',

  control: {
    '*': {
      specialKey: 'onSpecialKey'
    }
  },

  onSpecialKey: function(field, el){
    if (el.getKey() === Ext.EventObject.ENTER) {
      this.onLoginWithEnter(field);
    }
  },

  init: function() {
    this.getView().on('afterrender', function() {
      this.getView().down('#userID').focus();
    }, this);
  },

  onLoginWithEnter: function(field) {
    this.onLogin(field.up('form'));
  },

  onLoginWithButton: function(button) {
    this.onLogin(button.up('form'));
  },

  onLogin: function(loginform) {
    if (loginform.isValid()) {
      loginform.setLoading('დაელოდეთ...');
      loginform.down('label').setVisible(false);
      loginform.submit({
        url: '/api/user/login',
        success: function(form, action) {
          loginform.setLoading(false);
          loginform.fireEvent('loggedin', action.result, loginform.down('[name=password]').value);
        },
        failure: function(form, action) {
          loginform.setLoading(false);
          loginform.down('label').setVisible(true);
        },
      });
    }
  },
});
