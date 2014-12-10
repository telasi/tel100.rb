/*
 * File: app/view/hr/Tree.js
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

Ext.define('Tel100.view.hr.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hrTree',

  requires: [
    'Tel100.view.hr.TreeViewModel',
    'Tel100.view.hr.TreeViewController',
    'Ext.tree.View',
    'Ext.tree.Column',
    'Ext.panel.Tool'
  ],

  controller: 'hrtree',
  viewModel: {
    type: 'hrtree'
  },
  bodyCls: 'x-tree-noicon',
  hideHeaders: true,
  store: 'hr.Tree',

  bind: {
    title: '<i class="fa fa-bolt"></i> {i18n.app.telasi}'
  },
  viewConfig: {

  },
  columns: [
    {
      xtype: 'treecolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.toHRTreeHtml) {
          return record.toHRTreeHtml();
        } else {
          return '<i class="fa fa-bolt"></i> ' + Helpers.i18n().app.telasi;
        }
      },
      dataIndex: 'name',
      flex: 1
    }
  ],
  listeners: {
    beforerender: 'onBeforeRender'
  },
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    }
  ]

});