/*
 * File: app/view/document/motions/AssigneePanel.js
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

Ext.define('Tel100.view.document.motions.AssigneePanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsassigneepanel',

  requires: [
    'Tel100.view.document.motions.AssigneePanelViewModel',
    'Ext.grid.Panel',
    'Ext.grid.View',
    'Ext.grid.column.Column'
  ],

  viewModel: {
    type: 'documentmotionsassigneepanel'
  },
  height: 250,
  width: 400,
  layout: 'fit',

  bind: {
    title: '{i18n.document.motion.assignees} ({assigneeCount})'
  },
  items: [
    {
      xtype: 'gridpanel',
      columns: [
        {
          xtype: 'gridcolumn',
          draggable: false,
          resizable: false,
          width: 40,
          sortable: false,
          hideable: false,
          text: ''
        },
        {
          xtype: 'gridcolumn',
          draggable: false,
          width: 200,
          sortable: false,
          hideable: false,
          bind: {
            text: '{i18n.document.motion.receiver}'
          }
        },
        {
          xtype: 'gridcolumn',
          draggable: false,
          width: 200,
          sortable: false,
          hideable: false,
          bind: {
            text: '{i18n.document.motion.motion_text}'
          }
        },
        {
          xtype: 'gridcolumn',
          draggable: false,
          width: 100,
          sortable: false,
          hideable: false,
          bind: {
            text: '{i18n.document.motion.due_date}'
          }
        }
      ]
    }
  ]

});