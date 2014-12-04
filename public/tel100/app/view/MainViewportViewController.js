/*
 * File: app/view/MainViewportViewController.js
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

Ext.define('Tel100.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',

  requires: [
    'Tel100.model.User'
  ],

  openWorkingArea: function() {
    // set current user
    var user = Helpers.getCurrentUser();
    this.getViewModel().set('currentUser', user);

    // open UI
    var view = this.getView();
    var layout = view.getLayout();
    layout.setActiveItem('workarea');
  },

  onAfterRender: function(component, eOpts) {
    var txtUsername = component.down('#username');
    var txtPassword = component.down('#password');
    var username = Helpers.getPreferenceValue('username');
    if (username) {
      txtUsername.setValue(username);
      txtPassword.focus();
    } else {
      txtUsername.focus();
    }
  },

  onPasswordSpecialkey: function(field, e, eOpts) {
    if (e.getKey() === Ext.EventObject.ENTER) {
      this.onLogin();
    }
  },

  onLogin: function(button, e, eOpts) {
    var self = this;
    var view = self.getView();

    var txtUsername = view.down('#username');
    var txtPassword = view.down('#password');

    var username = txtUsername.value;
    var password = txtPassword.value;

    if (username && password) {
      Helpers.ajaxRequest({
        url: '/api/user/login',
        method: 'POST',
        view: view,
        params: {
          userID: username,
          password: password,
          api_locale: Helpers.getCurrentLocale()
        },
        success: function(data) {
          var user = new Tel100.model.User(data.user);
          Helpers.setCurrentUser(user, password);
          Helpers.setPreferenceValue('username', username);
          self.openWorkingArea();
        }
      });
    }
  },

  onBeforeRender: function(component, eOpts) {
    this.getViewModel().set('i18n', i18n[Helpers.getCurrentLocale()]);
  }

});
