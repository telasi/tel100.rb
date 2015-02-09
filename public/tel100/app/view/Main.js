/*
 * File: app/view/Main.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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

Ext.define('Tel100.view.Main', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.main',

  requires: [
    'Tel100.view.MainViewModel',
    'Tel100.view.MainViewController',
    'Tel100.view.user.login.Panel',
    'Tel100.view.workarea.LocaleSelector',
    'Tel100.view.workarea.Panel',
    'Ext.button.Segmented',
    'Ext.panel.Panel'
  ],

  controller: 'main',
  viewModel: {
    type: 'main'
  },
  itemId: 'main-viewport',

  layout: {
    type: 'card',
    deferredRender: true
  },
  items: [
    {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
      },
      items: [
        {
          xtype: 'userloginpanel',
          itemId: 'login',
          listeners: {
            loggedin: 'onLoggedin'
          }
        },
        {
          xtype: 'workarealocaleselector',
          margin: 8
        }
      ]
    },
    {
      xtype: 'workareapanel',
      border: false,
      itemId: 'workarea'
    }
  ],
  listeners: {
    beforerender: 'onBeforeRender'
  }

});