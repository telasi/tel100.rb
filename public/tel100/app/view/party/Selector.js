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
    'Ext.grid.column.Column'
  ],

  controller: 'partyselector',
  viewModel: {
    type: 'partyselector'
  },
  height: 400,
  width: 700,
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
      width: 300,
      region: 'west',
      split: true,
      listeners: {
        celldblclick: 'onHRTreeDblClick'
      }
    },
    {
      xtype: 'gridpanel',
      region: 'center',
      itemId: 'selectedParties',
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
      ]
    }
  ],

  onHRTreeDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    if (record.get('ext_type') === 'hr.Employee' && record.get('has_user')) {
      this.getController().onAddParty(record);
    }
  }

});