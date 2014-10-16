Ext.define('Telasi.view.user.Login', {
  extend: 'Ext.form.Panel',
  requires: [
    'Telasi.view.user.LoginController'
  ],
  alias : 'widget.userlogin',
  controller: 'userlogin',

  title: null,
  frame: false,
  layout: 'center',

  items: [{
    xtype: 'panel',
    layout: 'vbox',
    width: 400,
    items: [{
      xtype: 'panel',
      cls: 'application-title',
      width: '100%',
      items: [{
        xtype: 'label',
        width: '100%',
        html: '<i class="fa fa-send-o"></i> tel100',
        style: 'display:block;text-align:center;padding:8px 0;'
      }]
    }, {
      xtype: 'panel',
      title: 'შესვლა',
      bodyPadding: 10,
      width: 400,
      items: [{
        xtype: 'textfield',
        id: 'userID',
        allowBlank: false,
        name: 'userID',
        fieldLabel: 'მომხმარებელი',
        emptyText: 'ჩაწერეთ მომხმარებელი',
        width: '100%'
      }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'password',
        fieldLabel: 'პაროლი',
        emptyText: 'ჩაწერეთ პაროლი',
        inputType: 'password',
        width: '100%'
      }, {
        xtype: 'label',
        hidden: true,
        text: 'არასწორი მომხმარებელი/პაროლი',
        cls: 'text-danger'
      }],
      dockedItems: [{
        xtype: 'panel',
        dock: 'bottom',
        items: [{
          xtype: 'button',
          text: 'სისტემაში შესვლა',
          formBind: true,
          width: '100%',
          handler: 'onLogin',
          scale: 'medium'
        }]
      }]
    }]
  }],
});
