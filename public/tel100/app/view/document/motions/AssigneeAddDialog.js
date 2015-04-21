/*
 * File: app/view/document/motions/AssigneeAddDialog.js
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

Ext.define('Tel100.view.document.motions.AssigneeAddDialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentmotionsassigneeadddialog',

  requires: [
    'Tel100.view.document.motions.AssigneeAddDialogViewModel',
    'Tel100.view.document.motions.AssigneeAddDialogViewController',
    'Ext.grid.Panel',
    'Ext.grid.column.Column',
    'Ext.grid.View',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.grid.plugin.CellEditing',
    'Ext.toolbar.Toolbar',
    'Ext.button.Button',
    'Ext.toolbar.Spacer'
  ],

  controller: 'documentmotionsassigneeadddialog',
  viewModel: {
    type: 'documentmotionsassigneeadddialog'
  },
  height: 450,
  width: 850,
  layout: 'border',
  maximizable: true,

  bind: {
    title: '{i18n.document.motion.add_assignees}'
  },
  items: [
    {
      xtype: 'gridpanel',
      region: 'west',
      split: true,
      itemId: 'grid-in',
      width: 200,
      bind: {
        selection: '{selection}',
        store: '{incoming}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          resizable: false,
          sortable: false,
          dataIndex: 'html_text',
          hideable: false,
          flex: 1,
          bind: {
            text: '{i18n.document.motion.incoming}'
          }
        }
      ]
    },
    {
      xtype: 'gridpanel',
      region: 'center',
      itemId: 'grid-out',
      bodyBorder: false,
      bind: {
        selection: '{outSelection}',
        store: '{outgoing}'
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
          width: 180,
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
          sortable: false,
          dataIndex: 'due_date',
          formatter: 'date("d/m/Y")',
          hideable: false,
          bind: {
            text: '{i18n.document.motion.due_date}'
          },
          editor: {
            xtype: 'datefield',
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
          ptype: 'cellediting',
          clicksToEdit: 1
        }
      ],
      listeners: {
        beforecellcontextmenu: 'showOutMotionsContextMenu'
      }
    }
  ],
  listeners: {
    beforerender: 'onWindowBeforeRender',
    motionchange: 'onOutgoingMotionChange'
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      flex: 1,
      dock: 'bottom',
      autoScroll: true,
      items: [
        {
          xtype: 'button',
          handler: function(button, e) {
            var view = this.up('documentmotionsassigneeadddialog');
            var dialog = helpers.party.getPartyDialog(function(assignees) {
              view.getController().addReceivers(assignees);
            });
            dialog.show();
          },
          bind: {
            text: '{i18n.document.motion.actions.add_assignee}'
          }
        },
        {
          xtype: 'tbspacer',
          flex: 1
        },
        {
          xtype: 'button',
          bind: {
            text: '{i18n.document.motion.actions.send_assigness}'
          }
        }
      ]
    }
  ],

  setDocument: function(doc) {
    var vm = this.getViewModel();
    vm.set('document', doc);
  },

  getDocument: function() {
    var vm = this.getViewModel();
    return vm.get('document');
  },

  refreshOutgrid: function() {
    this.down('#grid-out').getStore().load();
  }

});