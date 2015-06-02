Ext.define('Tel100.view.user.profile.Dialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.userprofiledialog',
  controller: 'userprofiledialog',
  viewModel: {
    type: 'userprofiledialog'
  },

  width: 500,
  height: 300,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bind: {
    title: '{i18n.user.ui.profile}'
  },

  autoScroll: true,
  bodyPadding: 10,
  constrain: true,
  closable: true,
  resizeable: true,
  items: [{
    xtype: 'displayfield',
    bind: {
      fieldLabel: '{i18n.user.eflow_user_name}',
      value: '<code>{currentUser.eflow_user_name}</code>'
    }
  }, {
    xtype: 'textfield',
    bind: {
      fieldLabel: '{i18n.user.username}',
      value: '{currentUser.username}'
    }
  }, {
    xtype: 'textfield',
    bind: {
      fieldLabel: '{i18n.user.email}',
      value: '{currentUser.email}'
    }
  }, {
    xtype: 'textfield',
    bind: {
      fieldLabel: '{i18n.user.mobile}',
      value: '{currentUser.mobile}'
    }
  }, {
    xtype: 'textfield',
    bind: {
      fieldLabel: '{i18n.user.phone}',
      value: '{currentUser.phone}'
    }
  }],

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    items: ['->', {
      bind: {
        text: '{saveText}',
        disabled: '{saving}'
      },
      listeners: {
        click: 'onSave'
      }
    }]
  }]
});

Ext.define('Tel100.view.user.profile.DialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.userprofiledialog',

  data: {
    currentUser: null,
    saving: false
  },

  formulas: {
    saveText: function(get) {
      if (get('saving')) {
        return '<i class="fa fa-spinner fa-spin"></i> ' + i18n.ui.save;
      } else {
        return i18n.ui.save;
      }
    }
  }
});

Ext.define('Tel100.view.user.profile.DialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userprofiledialog',

  onSave: function() {
    var view = this.getView();
    var vm = this.getViewModel();
    var user = vm.get('currentUser');
    var params = {
      email: user.get('email'),
      mobile: user.get('mobile'),
      phone: user.get('phone'),
      username: user.get('username')
    };
    helpers.api.user.update(params, {
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
