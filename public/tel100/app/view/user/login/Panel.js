Ext.define('Tel100.view.user.login.Panel', {
  extend: 'Ext.container.Container',
  alias: 'widget.userloginpanel',

  controller: 'userloginpanel',
  viewModel: {
    type: 'userloginpanel'
  },

  layout: {
    type: 'hbox',
    align: 'middle',
    pack: 'center'
  },
  items: [
    {
      xtype: 'form',
      flex: 0,
      frame: true,
      width: 400,
      bodyBorder: true,
      bodyPadding: 10,
      bind: {
        title: '{i18n.user.ui.login_title}'
      },
      items: [
        {
          xtype: 'textfield',
          anchor: '100%',
          itemId: 'username',
          allowBlank: false,
          bind: {
            fieldLabel: '{i18n.user.username}'
          }
        },
        {
          xtype: 'textfield',
          anchor: '100%',
          itemId: 'password',
          inputType: 'password',
          allowBlank: false,
          bind: {
            fieldLabel: '{i18n.user.password}'
          },
          listeners: {
            specialkey: 'onPasswordSpecialkey'
          }
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
            align: 'stretch',
            pack: 'end'
          },
          items: [
            {
              xtype: 'button',
              formBind: true,
              bind: {
                text: '{i18n.user.ui.login}'
              },
              listeners: {
                click: 'onLoginClick'
              }
            }
          ]
        }
      ]
    }
  ],
  listeners: {
    afterrender: 'onAfterRender'
  }

});