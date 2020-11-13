Ext.define('Tel100.view.templates.Selector', {
  extend: 'Ext.window.Window',
  alias: 'widget.templateselector',

  requires: [
    // 'Tel100.view.party.SelectorViewModel',
    // 'Tel100.view.party.SelectorViewController',
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

  controller: 'templateselector',
  viewModel: {
    type: 'templateselector'
  },
  height: 500,
  width: 950,
  autoDestroy: false,
  closeAction: 'hide',
  title: 'Select Template',
  maximizable: true,
  modal: true,
  defaultListenerScope: true,

  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'gridpanel',
      cls: 'panel-with-border',
      itemId: 'selectedTemplates',
      width: 300,
      bodyBorder: true,
      hideHeaders: true,
      bind: {
        title: '{i18n.selector.selectedTemplates}',
        store: '{templates}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          text: 'Name',
          flex: 1
        }
      ],
      listeners: {
        celldblclick: 'onSelectedTemplatesCellDblClick'
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
    },
    {
      xtype: 'splitter',
      width: 5
    },
    {
      xtype: 'container',
      flex: 1,
      cls: 'document-body',
      overflowY: 'scroll',
      bind: {
        html: '{template}'
      }
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
            text: '{i18n.ui.delete}'
          },
          listeners: {
            click: 'onDeleteClick'
          }
        },
        {
          xtype: 'button',
          bind: {
            text: '{i18n.ui.save}'
          },
          listeners: {
            click: 'onSaveClick'
          }
        },
        {
          xtype: 'tbspacer',
          flex: 1
        },
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

  onSelectedTemplatesCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    debugger;
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