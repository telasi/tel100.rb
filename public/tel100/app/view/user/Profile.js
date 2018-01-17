Ext.define('Tel100.view.user.profile.Dialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.userprofiledialog',
  controller: 'userprofiledialog',
  viewModel: {
    type: 'userprofiledialog'
  },

  width: 500,
  height: 340,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bind: {
    title: '{i18n.user.ui.profile}'
  },

  autoScroll: true,
  bodyPadding: 5,
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
  }, {
    xtype: 'component',
    autoEl: {tag:'hr'}
  },{
    xtype: 'checkboxfield',
    inputValue: '1',
    uncheckedValue: '0',
    bind: {
      fieldLabel: '{i18n.user.notif_mail}',
      value: '{currentSettings.notif_mail}'
    },
    listeners: {
      change: function(field, newValue, oldValue, eOpts){ 
        field.up().getViewModel().set('currentSettings.notif_mail', newValue == true ? 1 : 0); 
      }
    },
    labelWidth: 200
  },{
    xtype: 'checkboxfield',
    inputValue: '1',
    uncheckedValue: '0',
    bind: {
      fieldLabel: '{i18n.user.notif_sms}',
      value: '{currentSettings.notif_sms}'
    },
    listeners: {
      change: function(field, newValue, oldValue, eOpts){ field.up().getViewModel().set('currentSettings.notif_sms', newValue == true ? 1 : 0); }
    },
    labelWidth: 200
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
  }],

  initComponent: function() {
    this.callParent();
    var view = this;
    var viewModel = this.getViewModel();
    var store = viewModel.getStore('settings');
    store.view = view;
    store.viewModel = viewModel;
    // viewModel.bind('{settings}', function(store) {
    //   if (store) {
    //     debugger;
    //     store.view = view;
    //     store.viewModel = viewModel;
    //   }
    // });
  },
});

Ext.define('Tel100.view.user.profile.DialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.userprofiledialog',

  data: {
    currentUser: null,
    saving: false,
    currentSettings: null
  },

  stores: {
    settings: {
      autoLoad: true,
      model: 'Tel100.model.Setting',
      listeners: {
        datachanged: function(store, recs, success) {
          this.viewModel.set('currentSettings', store.data.items[0].data)
        }
      }
    }
  },

  formulas: {
    saveText: function(get) {
      if (get('saving')) {
        return '<i class="fa fa-spinner fa-spin"></i> ' + i18n.ui.save;
      } else {
        return i18n.ui.save;
      }
    }
  },

});

Ext.define('Tel100.view.user.profile.DialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userprofiledialog',

  onSave: function() {
    var view = this.getView();
    var vm = this.getViewModel();
    var user = vm.get('currentUser');
    var notif_mail = vm.get('currentSettings').notif_mail == true ? 1 : 0;
    var notif_sms = vm.get('currentSettings').notif_sms == true ? 1 : 0;
    var params = {
      email: user.get('email'),
      mobile: user.get('mobile'),
      phone: user.get('phone'),
      username: user.get('username'),
      notif_mail: notif_mail,
      notif_sms:  notif_sms
    };
    helpers.api.user.update(params, {
      success: function() {
        vm.set('saving', false);
        // vm.getStore('settings').reload();
        view.close();
      },
      failure: function() {
        vm.set('saving', false);
      }
    });
  }
});
