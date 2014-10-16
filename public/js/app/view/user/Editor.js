Ext.define('Telasi.view.user.Editor', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.userEditor',

  items: {
    xtype: 'panel',
    padding: 10,
    items: [{
      xtype: 'textfield',
      bind: '{user.username}',
      fieldLabel: 'მომხმ.სახელი',
      width: '100%',
    }, {
      xtype: 'textfield',
      bind: '{user.email}',
      fieldLabel: 'ელ.ფოსტა',
      width: '100%',
    }, {
      xtype: 'textfield',
      bind: '{user.mobile}',
      fieldLabel: 'მობილური',
      width: '100%',
    }, {
      xtype: 'textfield',
      bind: '{user.phone}',
      fieldLabel: 'შიდა ტელ. #',
      width: '100%',
    }],
    dockedItems: [{
      xtype: 'panel',
      dock: 'bottom',
      items: [{
        xtype: 'button',
        text: 'მონაცემების შენახვა',
        width: '100%'
      }]
    }]
  },
});
