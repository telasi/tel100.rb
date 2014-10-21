Ext.define('Telasi.view.user.Editor', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.userEditor',
  padding: 10,
  border: false,
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
    border: false,
    items: [{
      xtype: 'button',
      text: 'მონაცემების შენახვა',
      width: '100%'
    }]
  }],
});
