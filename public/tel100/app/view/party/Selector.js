/*
 * File: app/view/party/Selector.js
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

Ext.define('Tel100.view.party.Selector', {
  extend: 'Ext.window.Window',
  alias: 'widget.partyselector',

  requires: [
    'Tel100.view.party.SelectorViewModel',
    'Tel100.view.party.SelectorViewController',
    'Tel100.view.hr.tree.Panel',
    'Ext.tree.Panel',
    'Ext.grid.Panel',
    'Ext.grid.View',
    'Ext.grid.column.Column',
    'Ext.panel.Tool',
    'Ext.toolbar.Toolbar',
    'Ext.button.Button',
    'Ext.toolbar.Spacer'
  ],

  controller: 'partyselector',
  viewModel: {
    type: 'partyselector'
  },
  height: 400,
  width: 800,
  autoDestroy: false,
  layout: 'border',
  title: 'Select Party',
  maximizable: true,
  modal: true,
  defaultListenerScope: true,

  items: [
    {
      xtype: 'hrtreepanel',
      tools: [
        {
          type: 'plus',
          handler: function() {
            var tree = this.up('hrtreepanel');
            var selection = tree.getSelection();
            if (selection.length > 0) {
              var controller = this.up('partyselector').getController();
              controller.onAddParty(selection[0]);
            }
          }
        }
      ],
      region: 'center',
      split: true,
      listeners: {
        celldblclick: 'onHRTreeDblClick'
      }
    },
    {
      xtype: 'gridpanel',
      region: 'east',
      split: true,
      itemId: 'selectedParties',
      width: 250,
      hideHeaders: true,
      bind: {
        title: '{i18n.selector.selectedParties}',
        store: '{parties}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return record.toTreeHtml();
          },
          dataIndex: 'name',
          flex: 1
        }
      ],
      listeners: {
        celldblclick: 'onSelectedPartiesCellDblClick'
      },
      tools: [
        {
          xtype: 'tool',
          type: 'minus',
          listeners: {
            click: 'onRemoveToolClick'
          }
        }
      ]
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          xtype: 'button',
          bind: {
            text: '{i18n.ui.cancel}'
          },
          listeners: {
            click: 'onCancelClick'
          }
        },
        {
          xtype: 'tbspacer',
          flex: 1
        },
        {
          xtype: 'button',
          bind: {
            text: '{i18n.selector.selectorConfirm}'
          },
          listeners: {
            click: 'onSelectClicked'
          }
        }
      ]
    }
  ],

  onHRTreeDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    if (record.get('ext_type') === 'hr.Employee' && record.get('has_user')) {
      this.getController().onAddParty(record);
    }
  },

  onSelectedPartiesCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    this.getController().onRemoveParty(record);
  },

  onRemoveToolClick: function(tool, e, owner, eOpts) {
    var grid = this.down('gridpanel');
    var selection = grid.getSelection();
    if (selection.length > 0) {
      this.getController().onRemoveParty(selection[0]);
    }
  },

  onCancelClick: function(button, e, eOpts) {
    this.close();
  },

  onSelectClicked: function(button, e, eOpts) {
    var data = [];
    var grid = this.down('gridpanel');
    var store = grid.getStore();
    store.each(function(item) { data.push(item); });
    this.fireEvent('selectioncomplete', data);
    this.close();
  }

});