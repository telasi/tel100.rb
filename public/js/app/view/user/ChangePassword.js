Ext.define('Telasi.view.user.ChangePassword', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.changePassword',
  border: false,
  padding: 10,

  items: [{
    xtype: 'textfield',
    fieldLabel: 'ძველი პაროლი',
    width: '100%',
    inputType: 'password'
  }, {
    xtype: 'textfield',
    fieldLabel: 'ახალი პაროლი',
    width: '100%',
    inputType: 'password'
  }, {
    xtype: 'textfield',
    fieldLabel: 'დადასტურება',
    width: '100%',
    inputType: 'password'
  }],

  dockedItems: [{
    dock: 'bottom',
    xtype: 'button',
    text: 'პაროლის შეცვლა',
    width: '100%'
  }],
});
