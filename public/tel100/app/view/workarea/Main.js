/*
 * File: app/view/workarea/Main.js
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

Ext.define('Tel100.view.workarea.Main', {
  extend: 'Ext.container.Container',
  alias: 'widget.workareamain',

  requires: [
    'Tel100.view.workarea.MainViewModel',
    'Tel100.view.workarea.ApplicationMenu',
    'Tel100.view.workarea.UserMenu',
    'Tel100.view.workarea.LocaleSelector',
    'Ext.button.Segmented',
    'Ext.toolbar.Spacer',
    'Ext.button.Split'
  ],

  viewModel: {
    type: 'workareamain'
  },
  layout: 'border',

  items: [
    {
      xtype: 'container',
      region: 'north',
      padding: 5,
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'workareaapplicationmenu',
          flex: 0
        },
        {
          xtype: 'tbspacer',
          flex: 1
        },
        {
          xtype: 'workareausermenu',
          bind: {
            text: '<i class="fa fa-user"></i> {currentUser.full_name}'
          }
        },
        {
          xtype: 'workarealocaleselector',
          margin: '0 0 0 10',
          flex: 0
        }
      ]
    }
  ]

});