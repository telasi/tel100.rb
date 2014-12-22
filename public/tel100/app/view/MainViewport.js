/*
 * File: app/view/MainViewport.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.MainViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.mainviewport',

  requires: [
    'Tel100.view.MainViewportViewModel',
    'Tel100.view.MainViewportViewController',
    'Tel100.view.workarea.LocaleSelector',
    'Tel100.view.workarea.Main',
    'Ext.form.Panel',
    'Ext.form.field.Text',
    'Ext.button.Button',
    'Ext.button.Segmented'
  ],

  controller: 'mainviewport',
  viewModel: {
    type: 'mainviewport'
  },
  itemId: 'main-viewport',

  layout: {
    type: 'card',
    deferredRender: true
  },
  listeners: {
    afterrender: 'onAfterRender',
    beforerender: 'onBeforeRender'
  },
  items: [
    {
      xtype: 'container',
      itemId: 'autharea',
      layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
      },
      items: [
        {
          xtype: 'form',
          frame: true,
          width: 400,
          bodyPadding: 10,
          bind: {
            title: '<i class="fa fa-user"></i> {i18n.user.login}'
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
                align: 'middle',
                pack: 'end'
              },
              items: [
                {
                  xtype: 'button',
                  formBind: true,
                  itemId: 'login-button',
                  padding: 5,
                  bind: {
                    text: '{i18n.user.login_btn} &rarr;'
                  },
                  listeners: {
                    click: 'onLogin'
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'workarealocaleselector',
          margin: 10,
          margins: ''
        }
      ]
    },
    {
      xtype: 'container',
      itemId: 'workarea',
      layout: 'fit',
      items: [
        {
          xtype: 'mainWorkarea',
          itemId: 'workarea-main'
        }
      ]
    }
  ]

});