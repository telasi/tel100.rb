/*
 * File: app/view/document/editor/Panel.js
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

Ext.define('Tel100.view.document.editor.Panel', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditorpanel',

  requires: [
    'Tel100.view.document.editor.PanelViewModel',
    'Tel100.view.document.editor.General',
    'Ext.form.field.Text',
    'Ext.form.field.HtmlEditor',
    'Ext.form.Panel'
  ],

  viewModel: {
    type: 'documenteditorpanel'
  },
  layout: 'border',

  items: [
    {
      xtype: 'container',
      flex: 1,
      region: 'center',
      layout: 'border',
      items: [
        {
          xtype: 'textfield',
          submitEmptyText: false,
          region: 'north',
          emptyText: 'enter document status',
          bind: {
            value: '{document.subject}'
          }
        },
        {
          xtype: 'htmleditor',
          region: 'center',
          bind: {
            value: '{document.body}'
          }
        }
      ]
    },
    {
      xtype: 'container',
      region: 'east',
      split: true,
      padding: 0,
      width: 300,
      layout: 'accordion',
      items: [
        {
          xtype: 'documenteditorgeneral',
          bind: {
            title: '{i18n.document.base.general}'
          }
        }
      ]
    }
  ]

});