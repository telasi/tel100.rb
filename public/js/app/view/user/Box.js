Ext.define('Telasi.view.user.Box', {
  extend: 'Ext.form.Panel',
  alias : 'widget.userbox',

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
        handler: function() {
          console.log('TODO: call profile editor');
        },
      }, {
        text: 'პროგრამიდან გასვლა',
        handler: function() {
          console.log('TODO: call exit action');
        },
      }],
      width: 250
    }
  }, {
    xtype: 'label',
    bind: '{currentUser.employee.organization.name}',
    margin: '5 10 10 10',
    cls: 'text-muted',
  }, ],
});
