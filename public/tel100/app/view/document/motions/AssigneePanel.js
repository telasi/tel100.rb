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
    'Ext.grid.column.Column',
    'Ext.panel.Tool'
  ],

  viewModel: {
    type: 'documentmotionsassigneepanel'
  },
  height: 250,
  width: 400,
  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.assignees} ({assigneeCount})'
  },
  items: [
    {
      xtype: 'gridpanel',
      bind: {
        store: '{motions}'
      },
      viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
          var status = record.get('status');
          return helpers.document.status.motionStatusRowClass(status, record);
        }
      },
      columns: [
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return helpers.document.status.motionStatusIcon(value, record);
          },
          draggable: false,
          resizable: false,
          width: 32,
          sortable: false,
          dataIndex: 'status',
          hideable: false,
          text: ''
        },
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var receiver = record.get('receiver');
            if (receiver && receiver.ext_type == 'hr.Organization') {
              return '<i class="fa fa-bank"></i> ' + value;
            } else {
              return '<i class="fa fa-user"></i> ' + value;
            }
          },
          draggable: false,
          width: 200,
          sortable: false,
          dataIndex: 'receiverName',
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
          dataIndex: 'motion_text',
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
          dataIndex: 'due_date',
          formatter: 'date("d/m/Y")',
          hideable: false,
          bind: {
            text: '{i18n.document.motion.due_date}'
          }
        }
      ]
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefreshToolClick'
      }
    }
  ],

  onRefreshToolClick: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  refresh: function() {
    var vm = this.getViewModel();
    vm.getStore('motions').load();
  },

  initComponent: function() {
    this.callParent();
    var view = this;
    var viewModel = this.getViewModel();
    viewModel.bind('{motions}', function(store) {
      if (store) {
        store.view = view;
        store.viewModel = viewModel;
      }
    });
  }

});