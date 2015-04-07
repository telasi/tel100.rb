/*
 * File: app/view/hr/tree/Panel.js
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

Ext.define('Tel100.view.hr.tree.Panel', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hrtreepanel',

  requires: [
    'Tel100.view.hr.tree.PanelViewModel',
    'Tel100.view.hr.tree.PanelViewController',
    'Ext.tree.View',
    'Ext.tree.Column',
    'Ext.panel.Tool',
    'Ext.toolbar.Toolbar',
    'Ext.button.Button',
    'Ext.form.field.Text',
    'Tel100.model.hr.Employee',
    'Tel100.model.hr.Organization'
  ],

  controller: 'hrtreepanel',
  viewModel: {
    type: 'hrtreepanel'
  },
  bodyCls: 'x-tree-noicon',
  autoLoad: true,
  enableColumnHide: false,
  hideHeaders: true,
  rowLines: true,
  lines: false,
  rootVisible: false,
  useArrows: true,

  bind: {
    title: '{i18n.hr.tree.title}',
    store: '{structure}'
  },
  viewConfig: {

  },
  columns: [
    {
      xtype: 'treecolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.toHtml) {
          return record.toHtml();
        } else {
          return '<i class="fa fa-bolt"></i> ' + i18n.application.telasi;
        }
      },
      dataIndex: 'name',
      flex: 1
    }
  ],
  listeners: {
    beforeload: 'onTreepanelBeforeLoad',
    load: 'onTreepanelLoad'
  },
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          xtype: 'button',
          text: '<i class="fa fa-backward"></i>'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Label',
          hideLabel: true
        },
        {
          xtype: 'button',
          text: '<i class="fa fa-search"></i>',
          listeners: {
            click: 'onSearchButtonClick'
          }
        },
        {
          xtype: 'button',
          text: '<i class="fa fa-forward"></i>'
        }
      ]
    }
  ],

  refresh: function() {
    this.getStore('structure').load();
  }

});