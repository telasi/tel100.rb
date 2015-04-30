/*
 * File: app/view/document/relation/Panel.js
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

Ext.define('Tel100.view.document.relation.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentrelationpanel',

  requires: [
    'Tel100.view.document.relation.PanelViewModel',
    'Tel100.view.document.relation.PanelViewController',
    'Ext.grid.Panel',
    'Ext.grid.column.Action',
    'Ext.grid.View',
    'Ext.panel.Tool',
    'Tel100.view.document.Search'
  ],

  controller: 'documentrelationpanel',
  viewModel: {
    type: 'documentrelationpanel'
  },
  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.relation.relations} ({relationCount})'
  },
  items: [
    {
      xtype: 'gridpanel',
      hideHeaders: true,
      scroll: 'vertical',
      bind: {
        store: '{relations}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return '<strong>' + value + '</strong> <span class="text-muted">' + record.get('owner') + '</span>';
          },
          dataIndex: 'docnumber',
          text: 'document',
          flex: 1
        },
        {
          xtype: 'actioncolumn',
          width: 24,
          bind: {
            hidden: '{notEditable}'
          },
          items: [
            {
              handler: function(view, rowIndex, colIndex, item, e, record, row) {
                helpers.api.document.relation.delete({
                  params: {
                    id: record.id
                  },
                  success: function(params) {
                    view.up('documentrelationpanel').refresh();
                  }
                });
              },
              icon: '/images/delete.gif'
            }
          ]
        }
      ],
      listeners: {
        celldblclick: {
          fn: 'onGridpanelCellDblClick',
          scope: 'controller'
        }
      }
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    },
    {
      xtype: 'tool',
      type: 'plus',
      bind: {
        hidden: '{notEditable}'
      },
      listeners: {
        click: 'onAddRelation'
      }
    }
  ],

  onRefresh: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  onAddRelation: function(tool, e, owner, eOpts) {
    var vm = this.getViewModel();
    var doc = vm.get('document');
    var view = this;
    if (!this.searchDialog) {
      this.searchDialog = Ext.create('Tel100.view.document.Search', {
        closeAction: 'hide',
        modal: true,
        maximizable: true
      });

      this.searchDialog.on('documentselected', function(related) {
        helpers.api.document.relation.create({
          params: {
            base_id: doc.id,
            related_id: related.id
          },
          success: function(params) {
            view.refresh();
          }
        });
      });
    }
    this.searchDialog.setParentDocument(doc);
    this.searchDialog.show();
  },

  refresh: function() {
    var view = this;
    var grid = view.down('gridpanel');
    grid.getStore().load();
  },

  initComponent: function() {
    this.callParent();
    var vm = this.getViewModel();
    // setting view model for the relations store
    vm.bind('{relations}', function(store) {
      if (store) {
        store.viewModel = this;
      }
    });
  },

  setEditable: function(editable) {
    var vm = this.getViewModel();
    vm.set('editable', editable);
  }

});