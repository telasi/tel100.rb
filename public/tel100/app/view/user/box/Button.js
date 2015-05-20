Ext.define('Tel100.view.user.box.Button', {
  extend: 'Ext.button.Button',
  alias: 'widget.userboxbutton',

  controller: 'userboxbutton',
  viewModel: {
    type: 'userboxbutton'
  },

  bind: {
    text: '{boxtext}'
  },

  menu: {
    xtype: 'menu',
    items: [{
      xtype: 'menuitem',
      bind: {
        text: '{i18n.user.ui.profile}'
      }
    }, {
      xtype: 'menuitem',
      bind: {
        text: '{i18n.user.ui.switch}'
      },
      listeners: {
        click: 'onSwitch'
      }
    }, {
      xtype: 'menuseparator'
    }, {
      xtype: 'menuitem',
      bind: {
        text: '{logouttext}'
      },
      listeners: {
        click: 'onLogout'
      }
    }]
  }
});
