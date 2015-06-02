Ext.define('Tel100.view.user.changePassword.Dialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.userchangepassworddialog',
  controller: 'userchangepassworddialog',
  viewModel: {
    type: 'userchangepassworddialog'
  },

  width: 500,
  height: 200,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bind: {
    title: '{i18n.user.ui.changePassword}'
  },

  autoScroll: true,
  bodyPadding: 10,
  constrain: true,
  closable: true,
  resizeable: true,
  items: [{
    xtype: 'textfield',
    inputType: 'password',
    bind: {
      fieldLabel: '{i18n.user.password}',
      value: '{newPassword}'
    }
  }],

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    items: ['->', {
      text: 'Change Password',
      bind: {
        text: '{i18n.user.ui.changePassword}',
        disabled: '{saving}'
      },
      listeners: {
        click: 'onSave'
      }
    }]
  }]
});

Ext.define('Tel100.view.user.changePassword.DialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.userchangepassworddialog',

  data: {
    newPassword: null,
    saving: false
  }
});

Ext.define('Tel100.view.user.changePassword.DialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userchangepassworddialog',

  onSave: function() {
    var view = this.getView();
    var vm = this.getViewModel();
    vm.set('saving', true);
    var newPassword = vm.get('newPassword');
    helpers.api.user.changePassword(newPassword, {
      success: function() {
        vm.set('saving', false);
        view.close();
      },
      failure: function() {
        vm.set('saving', false);
      }
    });
  }
});
