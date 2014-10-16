Ext.define('Telasi.view.user.Box', {
  extend: 'Ext.form.Panel',
  alias : 'widget.userbox',

  title: null,
  frame: false,
  layout: 'vbox',

  items: [{
    xtype: 'label',
    bind:  '{currentUser.fullName} <strong>({currentUser.username})</strong>',
    padding: '5 5 0',
  }, {
    xtype: 'label',
    bind: '{currentUser.employee.organization.name}',
    cls: 'text-muted',
    padding: '5 5 0',
  }],
});
