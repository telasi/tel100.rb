/*
 * File: app/view/module/Admin.js
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

Ext.define('Tel100.view.module.Admin', {
  extend: 'Ext.container.Container',
  alias: 'widget.moduleadmin',

  requires: [
    'Tel100.view.module.AdminViewModel',
    'Tel100.view.document.type.grid.Panel',
    'Ext.grid.Panel',
    'Ext.grid.View',
    'Ext.grid.column.Column',
    'Ext.grid.feature.Grouping',
    'Ext.XTemplate'
  ],

  viewModel: {
    type: 'moduleadmin'
  },
  layout: 'border',

  items: [
    {
      xtype: 'gridpanel',
      flex: 0,
      region: 'west',
      split: true,
      width: 200,
      collapsible: false,
      hideHeaders: true,
      store: 'admin.Actions',
      bind: {
        title: '{i18n.admin.actions}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var category = record.get('category');
            var name = record.get('name');
            return Helpers.i18n().admin[category][name];
          },
          dataIndex: 'name',
          text: 'action',
          flex: 1
        }
      ],
      features: [
        {
          ftype: 'grouping',
          groupHeaderTpl: Ext.create('Ext.XTemplate', 
            '{name:this.categoryName}',
            {
              categoryName: function(name) {
                return Helpers.i18n().admin[name].groupName;
              }
            }
          )
        }
      ]
    },
    {
      xtype: 'container',
      flex: 1,
      region: 'center',
      layout: 'card',
      items: [
        {
          xtype: 'documenttypegridpanel'
        }
      ]
    }
  ]

});