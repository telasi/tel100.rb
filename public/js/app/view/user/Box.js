Ext.define('Telasi.view.user.Box', {
  extend: 'Ext.form.Panel',
  alias : 'widget.userbox',
  requires: [
    'Telasi.view.user.BoxController'
  ],
  controller: 'userbox',
  border: false,

  title: null,
  frame: false,
  layout: {
    type: 'vbox',
    align: 'end',
  },
  cls: 'user-box',

  items: [{
    xtype: 'button',
    bind: '<i class="fa fa-user"></i> <strong>{currentUser.username}</strong> {currentUser.fullName}',
    margin: '5 10 0 10',
    menu: {
      items: [{
        text: 'პროფილის მართვა',
        handler: 'onProfile',
      }, {
        text: 'პროგრამიდან გასვლა',
        handler: 'onLogout',
      }],
      width: 250
    }
  }, {
    xtype: 'label',
    bind: '<span class="text-muted">{currentUser.employee.organization.name}</span>',
    margin: '5 10 10 10',
  }, ],
});
