/*
 * File: app/view/party/Selector.js
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

Ext.define('Tel100.view.party.Selector', {
  extend: 'Ext.window.Window',
  alias: 'widget.partyselector',

  requires: [
    'Tel100.view.party.SelectorViewModel',
    'Tel100.view.party.SelectorViewController',
    'Tel100.view.party.Favourites',
    'Tel100.view.hr.tree.Panel',
    'Tel100.view.hr.party.Grid',
    'Tel100.view.bs.customer.Panel',
    'Ext.tab.Panel',
    'Ext.grid.Panel',
    'Ext.tab.Tab',
    'Ext.tree.Panel',
    'Ext.toolbar.Toolbar',
    'Ext.toolbar.Spacer',
    'Ext.resizer.Splitter',
    'Ext.grid.View',
    'Ext.grid.column.Column',
    'Ext.panel.Tool'
  ],

  controller: 'partyselector',
  viewModel: {
    type: 'partyselector'
  },
  height: 500,
  width: 950,
  autoDestroy: false,
  closeAction: 'hide',
  title: 'Select Party',
  maximizable: true,
  modal: true,
  defaultListenerScope: true,

  listeners: {
    show: 'onShowPanel'
  },

  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'tabpanel',
      flex: 1,
      activeTab: 1,
      items: [
        {
          xtype: 'partyfavourites',
          listeners: {
            beforeitemcontextmenu: {
              fn: 'onFavouritesBeforeItemContextMenu',
              scope: 'controller'
            },
            celldblclick: 'onFavouritesCellDblClick'
          }
        },
        {
          xtype: 'hrtreepanel',
          cls: 'panel-with-border',
          listeners: {
            celldblclick: 'onHRTreeDblClick',
            beforeitemcontextmenu: {
              fn: 'onHRStructureBeforeItemContextMenu',
              scope: 'controller'
            }
          },
          tabConfig: {
            xtype: 'tab',
            bind: {
              hidden: '{hideHR}'
            }
          }
        },
        {
          xtype: 'hrpartygrid',
          tabConfig: {
            xtype: 'tab',
            bind: {
              hidden: '{hideParty}'
            }
          },
          listeners: {
            itemdblclick: 'onPartyGridpanelItemDblClick',
            beforeitemcontextmenu: {
              fn: 'onPartiesBeforeItemContextMenu',
              scope: 'controller'
            }
          }
        },
        {
          xtype: 'bscustomerpanel',
          tabConfig: {
            xtype: 'tab',
            bind: {
              hidden: '{hideCustomers}'
            }
          },
          listeners: {
            itemdblclick: 'onCustomerGridpanelItemDblClick',
            beforeitemcontextmenu: {
              fn: 'onCustomerBeforeItemContextMenu',
              scope: 'controller'
            }
          }
        }
      ]
    },
    {
      xtype: 'splitter',
      width: 5
    },
    {
      xtype: 'gridpanel',
      cls: 'panel-with-border',
      itemId: 'selectedParties',
      width: 300,
      bodyBorder: true,
      hideHeaders: true,
      bind: {
        title: '{i18n.selector.selectedParties}',
        store: '{parties}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            if(record.toHtml){
              return record.toHtml();
            }
          },
          dataIndex: 'name',
          text: 'Name',
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
      flex: 1,
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

  onShowPanel: function(view, eOpts){
    this.down('hrtreepanel').getController().checkVersion();
  },

  onFavouritesCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    this.getController().addFromFavourites(record);
  },

  onHRTreeDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    this.getController().onAddParty(record);
  },

  onPartyGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
       if (record.get('ext_type') === 'hr.Party') {
              this.getController().onAddParty(record);
       }
  },

  onCustomerGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    if (record.get('ext_type') === 'bs.Customer') {
          this.getController().onAddParty(record);
    }
  },

  onCancelClick: function(button, e, eOpts) {
    this.close();
  },

  onSelectClicked: function(button, e, eOpts) {
    var data = [];
    var grid = this.down('#selectedParties');
    var store = grid.getStore();
    store.each(function(item) { data.push(item); });
    this.fireEvent('selectioncomplete', data);
    store.removeAll();
    this.close();
  },

  onSelectedPartiesCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    this.getController().onRemoveParty(record);
  },

  onRemoveToolClick: function(tool, e, owner, eOpts) {
    var grid = this.down('#selectedParties');
    var selection = grid.getSelection();
    if (selection.length > 0) {
      this.getController().onRemoveParty(selection[0]);
    }
  }

});