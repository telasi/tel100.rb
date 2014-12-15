/*
 * File: app/view/document/type/AdminPanel.js
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

Ext.define('Tel100.view.document.type.AdminPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documenttypeadminpanel',

  requires: [
    'Tel100.view.document.type.AdminPanelViewModel',
    'Tel100.view.document.type.AdminPanelViewController',
    'Tel100.view.document.type.grid.Panel',
    'Tel100.view.document.type.form.Panel',
    'Ext.grid.Panel',
    'Ext.form.Panel'
  ],

  controller: 'documenttypeadminpanel',
  viewModel: {
    type: 'documenttypeadminpanel'
  },
  layout: 'border',

  bind: {
    title: '{i18n.admin.documents.groupName} &gt; {i18n.admin.documents.types}'
  },
  items: [
    {
      xtype: 'documenttypegridpanel',
      width: 300,
      region: 'west',
      split: true,
      bind: {
        selection: '{selected}'
      },
      listeners: {
        selectionchange: 'onTypeChanged'
      }
    },
    {
      xtype: 'documenttypeformpanel',
      reference: 'doctypeForm',
      region: 'center'
    }
  ]

});