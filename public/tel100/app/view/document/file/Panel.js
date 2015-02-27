/*
 * File: app/view/document/file/Panel.js
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

Ext.define('Tel100.view.document.file.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentfilepanel',

  requires: [
    'Tel100.view.document.file.PanelViewModel',
    'Tel100.view.document.file.PanelViewController',
    'Ext.toolbar.Toolbar',
    'Ext.form.Panel',
    'Ext.form.field.File',
    'Ext.grid.Panel',
    'Ext.grid.View',
    'Ext.grid.column.Action'
  ],

  controller: 'documentfilepanel',
  viewModel: {
    type: 'documentfilepanel'
  },
  border: false,

  bind: {
    title: '{i18n.document.file.attachments}'
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      border: 0,
      items: [
        {
          xtype: 'form',
          border: false,
          padding: 0,
          bodyPadding: 0,
          items: [
            {
              xtype: 'filefield',
              cls: 'file-upload',
              padding: 0,
              name: 'file',
              buttonText: '<i class="fa fa-plus"></i>',
              listeners: {
                change: 'onFilefieldChange'
              }
            }
          ]
        }
      ]
    }
  ],
  items: [
    {
      xtype: 'gridpanel',
      border: false,
      hideHeaders: true,
      bind: {
        store: '{files}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          flex: 1
        },
        {
          xtype: 'actioncolumn',
          width: 24,
          items: [
            {
              handler: function(view, rowIndex, colIndex, item, e, record, row) {
                var id = record.id;
                helpers.api.document.file.delete(id, {
                  success: function() {
                    view.up('documentfilepanel').refresh();
                  }
                });
              },
              icon: '/images/delete.gif'
            }
          ]
        }
      ]
    }
  ],

  refresh: function() {
    this.down('gridpanel').getStore().load();
  }

});