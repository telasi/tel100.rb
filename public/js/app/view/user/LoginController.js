Ext.define('Telasi.view.user.LoginController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.userlogin',

  onLogin: function(button) {
    console.log('onLogin');
    var form = button.up('form');
    // var form = formElement.getForm();
    if (form.isValid()) {
      // form.setLoading('დაელოდეთ...');
      form.submit();
    }
  },
});
