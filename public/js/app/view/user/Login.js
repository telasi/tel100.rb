Ext.define('Telasi.view.user.Login', {
  extend: 'Ext.form.Panel',
  requires: [
    'Telasi.view.user.LoginController'
  ],
  alias : 'widget.userlogin',
  controller: 'userlogin',

  layout: 'center',

  items: [{
    xtype: 'panel',
    layout: 'vbox',
    width: 400,

    items: [{
      xtype: 'panel',
      title: 'შესვლა',
      frame: true,
      bodyPadding: 10,
      width: 400,

    //       defaults: {
    //   listeners: {
    //     specialKey: function(field, el){
    //       if(el.getKey() == Ext.EventObject.ENTER)
    //       {
    //         Ext.getCmp('submitbutton').handler.call(Ext.getCmp('submitbutton').scope);
    //       }
    //     }
    //   },
    // },
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
        padding: 10,
        items: [{
          xtype: 'button',
          itemId: 'submitbutton',
          text: 'სისტემაში შესვლა',
          formBind: true,
          width: '100%',
          handler: 'onLogin',
          scale: 'medium'
        }]
      }]
    }, {
      xtype: 'panel',
      //cls: 'application-title',
      width: '100%',
      items: [{
        xtype: 'label',
        width: '100%',
        html: '<i class="fa fa-send-o"></i> tel100 <br> 2015 &copy; სს "თელასი"',
        style: 'display:block;text-align:center;padding:8px 0;'
      }]
    }, ]
  }],
});
