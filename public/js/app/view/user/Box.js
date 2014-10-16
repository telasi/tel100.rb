Ext.define('Telasi.view.user.Box', {
  extend: 'Ext.form.Panel',
  alias : 'widget.userbox',

  title: null,
  frame: false,
  layout: 'vbox',

  items: [{
    xtype: 'splitbutton',
    bind: '<i class="fa fa-user"></i> {currentUser.username}',
    margin: '5 10 0 10',
    menu: [{
      text: 'პროფილი'
    }, {
      text: 'გასვლა'
    }]
  }, {
    xtype: 'label',
    bind: '{currentUser.employee.organization.name}',
    cls: 'text-muted',
    margin: '5 10 5 10',
  }],
});
