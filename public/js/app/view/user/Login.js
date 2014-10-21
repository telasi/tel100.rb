Ext.define('Telasi.view.user.Login', {
  extend: 'Ext.form.Panel',
  requires: [
    'Telasi.view.user.LoginController'
  ],
  alias : 'widget.userlogin',
  controller: 'userlogin',

  layout: 'center',
  border: false,

  items: [{
    xtype: 'panel',
    layout: 'vbox',
    border: false,
    width: 400,

    items: [{
      xtype: 'panel',
      title: '<i class="fa fa-user"></i> შესვლა',
      frame: true,
      border: false,
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
        xtype: 'button',
        dock: 'bottom',
        itemId: 'submitbutton',
        text: 'სისტემაში შესვლა',
        formBind: true,
        width: '100%',
        handler: 'onLoginWithButton',
        scale: 'medium'
      }]
    }, {
      xtype: 'panel',
      width: '100%',
      border: false,
      items: [{
        xtype: 'label',
        width: '100%',
        html: '<i class="fa fa-send-o"></i> tel100 <br> 2015 &copy; სს "თელასი"',
        style: 'display:block;text-align:center;padding:8px 0;'
      }]
    }, ]
  }],
});
