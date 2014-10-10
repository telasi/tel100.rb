Ext.define('Telasi.view.user.Login', {
  extend: 'Ext.form.Panel',
  alias : 'widget.userlogin',

  title: '',
  frame: false,
  layout: 'center',

  items: [
    {
      xtype: 'panel',
      title: 'შესვლა',
      width: 400,
      // height: 200,
      bodyPadding: 10,
      items: [{
        xtype: 'textfield',
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
      }],
      buttons: [{
        text:'შესვლა',
        action: 'login'
      }],
    }
  ],

  
});
