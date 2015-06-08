Ext.define('Tel100.view.document.relation.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentrelationpanel',

  controller: 'documentrelationpanel',
  viewModel: {
    type: 'documentrelationpanel'
  },
  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.relation.relations} ({relationCount})'
  },

  items: [{
    xtype: 'gridpanel',
    hideHeaders: true,
    scroll: 'vertical',
    bind: {
      store: '{relations}'
    },
    columns: [{
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return '<strong>' + value + '</strong> <span class="text-muted">' + record.get('owner') + '</span>';
      },
      dataIndex: 'docnumber',
      text: 'document',
      flex: 1
    }, {
      xtype: 'actioncolumn',
      width: 24,
      bind: {
        hidden: '{notEditable}'
      },
      items: [{
        handler: function(view, rowIndex, colIndex, item, e, record, row) {
          helpers.api.document.relation.delete({
            params: { id: record.id },
            success: function(params) {
              view.up('documentrelationpanel').refresh();
            }
          });
        },
        icon: '/images/delete.gif'
      }]
    }],
    listeners: {
      celldblclick: {
        fn: 'onGridpanelCellDblClick',
        scope: 'controller'
      }
    }
  }],
  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onRefresh'
    }
  }, {
    xtype: 'tool',
    type: 'plus',
    bind: {
      hidden: '{notEditable}'
    },
    listeners: {
      click: 'onAddRelation'
    }
  }],

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

      this.searchDialog.on('documentselected', function(related, type) {
        var relatedType = type === 'eflow' ? 'Eflow::Motion' : 'Document::Base';
        helpers.api.document.relation.create({
          params: {
            base_id: doc.id,
            related_id: related.id,
            related_type: relatedType
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

Ext.define('Tel100.view.document.relation.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentrelationpanel',

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var dm = this.getView().up('documentmain');
    var doc = Ext.create('Tel100.model.document.Base',{id: record.get('related_id')});
    doc.load({
      success: function(document){
        dm.getController().openDocument(doc);
      }
    });
  }
});

Ext.define('Tel100.view.document.relation.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentrelationpanel',

  data: {
    relationCount: 0,
    editable: false
  },

  stores: {
    relations: {
      listeners: {
        load: function() {
          this.viewModel.set('relationCount', this.getTotalCount());
        },
      },
      autoLoad: true,
      model: 'Tel100.model.document.Base',
      proxy: {
        type: 'ajax',
        extraParams: {
          base_id: '{document.id}'
        },
        url: '/api/documents/relations',
        reader: {
          type: 'json'
        }
      }
    }
  },

  formulas: {
    notEditable: function(get) {
      return !get('editable');
    }
  }
});
