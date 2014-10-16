Ext.define('Telasi.view.user.Editor', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.userEditor',

  items: {
    xtype: 'panel',
    padding: 10,
    items: [{
      xtype: 'textfield',
      bind: '{currentUser.username}',
      fieldLabel: 'მომხმ.სახელი',
      width: '100%',
    }, {
      xtype: 'textfield',
      bind: '{currentUser.email}',
      fieldLabel: 'ელ.ფოსტა',
      width: '100%',
    }, {
      xtype: 'textfield',
      bind: '{currentUser.mobile}',
      fieldLabel: 'მობილური',
      width: '100%',
    }, {
      xtype: 'textfield',
      bind: '{currentUser.phone}',
      fieldLabel: 'შიდა ტელ. #',
      width: '100%',
    }],

    dockedItems: [{
      xtype: 'panel',
      dock: 'bottom',
      items: [{
        xtype: 'button',
        text: 'შენახვა',
        width: '100%'
      }]
    }]
  },
});
