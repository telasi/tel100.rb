Ext.define('Tel100.view.user.box.Button', {
  extend: 'Ext.button.Button',
  alias: 'widget.userboxbutton',

  requires: [
    'Tel100.view.user.box.ButtonViewModel',
    'Tel100.view.user.box.ButtonViewController',
    'Ext.menu.Menu',
    'Ext.menu.Separator'
  ],

  controller: 'userboxbutton',
  viewModel: {
    type: 'userboxbutton'
  },

  bind: {
    text: '<i class="fa fa-user"></i> {currentUser.full_name} &rarr; {proxyUser.full_name}'
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
        text: '{i18n.user.switch}'
      },
      listeners: {
        click: 'onSwitch'
      }
    }, {
      xtype: 'menuseparator'
    }, {
      xtype: 'menuitem',
      bind: {
        text: '{i18n.user.ui.logout}'
      },
      listeners: {
        click: 'onLogout'
      }
    }]
  }
});
