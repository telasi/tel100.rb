/*
 * File: app/view/document/motions/OutGrid.js
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

Ext.define('Tel100.view.document.motions.OutGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionsoutgrid',

  requires: [
    'Tel100.view.document.motions.OutGridViewModel',
    'Ext.grid.column.Column',
    'Ext.form.field.Number',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.grid.View',
    'Ext.grid.plugin.CellEditing'
  ],

  config: {
    hasDraftMotion: false
  },

  viewModel: {
    type: 'documentmotionsoutgrid'
  },
  publishes: [
    'selection',
    'hasDraftMotion'
  ],

  bind: {
    store: '{motions}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return helpers.document.status.motionStatusIcon(value, record);
      },
      resizable: false,
      width: 28,
      sortable: false,
      dataIndex: 'status',
      hideable: false
    },
    {
      xtype: 'gridcolumn',
      width: 48,
      sortable: false,
      align: 'right',
      dataIndex: 'ordering',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.orderingShort}'
      },
      editor: {
        xtype: 'numberfield',
        decimalPrecision: 0,
        maxValue: 999,
        minValue: 1
      }
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
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return i18n.document.role[value];
      },
      width: 110,
      sortable: false,
      dataIndex: 'receiver_role',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.receiver_role}'
      },
      editor: {
        xtype: 'combobox',
        editable: false,
        displayField: 'localeField',
        valueField: 'name',
        bind: {
          store: '{roles}'
        }
      }
    },
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return record.get('send_type_name');
      },
      sortable: false,
      dataIndex: 'send_type_id',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.send_type}'
      },
      editor: {
        xtype: 'combobox',
        editable: false,
        displayField: 'html_name',
        valueField: 'id',
        bind: {
          store: '{responseTypes}'
        }
      }
    },
    {
      xtype: 'gridcolumn',
      width: 200,
      sortable: false,
      dataIndex: 'motion_text',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.motion_text}'
      },
      editor: {
        xtype: 'textfield'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 100,
      sortable: false,
      dataIndex: 'due_date',
      formatter: 'date("d/m/Y")',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.due_date}'
      },
      editor: {
        xtype: 'datefield',
        altFormats: '',
        format: 'd/m/Y'
      }
    }
  ],
  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store) {
      var status = record.get('status');
      return helpers.document.status.motionStatusRowClass(status, record);
    }
  },
  plugins: [
    {
      ptype: 'cellediting'
    }
  ],

  refresh: function() {
    var vm = this.getViewModel();
    var parentId = vm.get('parentId');
    var store = this.getStore();

    /// XXX isEmptyStore is not listed as a API method
    if (!store.isEmptyStore) {
      var self = this;
      self.setLoading(true);
      store.load({
        params: { parent_id: parentId },
        callback: function() {
          self.setLoading(false);
        }
      });
    }
  },

  initComponent: function() {
    this.callParent();
    var vm = this.getViewModel();
    // setting view model for the motions store
    vm.bind('{motions}', function(store) {
      if (store) {
        store.viewModel = this;
      }
    });
  }

});