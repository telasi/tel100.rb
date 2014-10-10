Ext.define('Telasi.controller.user.Login', {
  extend: 'Ext.app.Controller',

  views: [
    'Login@Telasi.view.user'
  ],

  init: function() {
    this.control({
      'userlogin button[action=login]': {
        click: function(button) {
          var formElement = button.up('form');
          var form = formElement.getForm();
          if (form.isValid()) {
            formElement.setLoading('დაელოდეთ...');
          }
        }
      }
    });
  },
});
