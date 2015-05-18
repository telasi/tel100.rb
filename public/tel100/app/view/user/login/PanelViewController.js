Ext.define('Tel100.view.user.login.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userloginpanel',

  onLogin: function() {
    var self = this;
    var view = self.getView();

    var txtUsername = view.down('#username');
    var txtPassword = view.down('#password');

    var username = txtUsername.value;
    var password = txtPassword.value;

    if (username && password) {
      helpers.ajax.request({
        url: '/api/user/login',
        method: 'POST',
        view: view,
        params: {
          userID: username,
          password: password,
          api_locale: helpers.i18n.getCurrentLocale()
        },
        success: function(data) {
          var user = new Tel100.model.User(data.user);
          helpers.user.setCurrentUser(user, password);
          view.fireEvent('loggedin', user);
        }
      });
    }
  },

  onPasswordSpecialkey: function(field, e, eOpts) {
    if (e.getKey() === Ext.EventObject.ENTER) {
      this.onLogin();
    }
  },

  onLoginClick: function(button, e, eOpts) {
    this.onLogin();
  },

  onAfterRender: function(component, eOpts) {
    var txtUsername = component.down('#username');
    var txtPassword = component.down('#password');
    var username = helpers.preferences.getValue('username');
    if (username) {
      txtUsername.setValue(username);
      txtPassword.focus();
    } else {
      txtUsername.focus();
    }
  }

});
