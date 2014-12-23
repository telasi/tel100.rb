/*
 * File: app/view/user/login/PanelViewController.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

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
          self.openWorkingArea();
        }
      });
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
