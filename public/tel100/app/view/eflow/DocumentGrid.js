Ext.define('Tel100.view.eflow.DocumentGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.eflowdocumentgrid',
  controller: 'eflowdocumentgrid',
  viewModel: {
    type: 'eflowdocumentgrid'
  },

  border: false,
  autoLoad: true,
  enableColumnHide: false,
  enableColumnMove: false,
  sortableColumns: false,
  defaultListenerScope: true,
  hideHeaders: true,

  bind: {
    store: '{documents}',
    title: '{i18n.eflow.title} ({totalCount})'
  },

  columns: [{
    xtype: 'gridcolumn',
    flex: 1,
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      var doc = record.get('document');
      var number = doc.number || doc.number2;
      return [
        '<code>', number, '</code> ',
        doc.name,
        ' &mdash; <span class="text-muted">', doc.note , '</span>'
      ].join('');
    },
  }],

  tools: [{
    type: 'refresh',
    handler: function(event, toolEl, panelHeader) {
      var view = panelHeader.up('eflowdocumentgrid');
      view.setLoading(true);
      view.store.load();
    }
  }],

  dockedItems: [{
    xtype: 'pagingtoolbar',
    bind: {
      store: '{documents}'
    },
    dock: 'bottom',
    displayInfo: false
  }, {
    xtype: 'panel',
    dock: 'top',
    bodyPadding: 3,
    bodyStyle: 'background: #eee',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'textfield',
      flex: 1,
      emptyText: 'enter doc#',
      itemId: 'docNumber'
    }, {
      xtype: 'button',
      text: '<i class="fa fa-search"></i> Search',
      listeners: {
        click: 'onSearch'
      }
    }]
  }],

  onBeforeLoad: function(store, operation, eOpts) {
    this.setLoading(true);
  },

  onLoad: function(store, records, successful, eOpts) {
    this.setLoading(false);
    this.getViewModel().set('totalCount', store.getTotalCount());
  },

  onSearch: function(button, event, eOpts) {
    var docNumber = this.down('#docNumber').value;
    var params = { doc_number: docNumber };
    this.getStore().load({ params: params });
  }
});

Ext.define('Tel100.view.eflow.DocumentGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.eflowdocumentgrid',
  data: {
    docNumber: null
  }
});

Ext.define('Tel100.view.eflow.DocumentGridViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.eflowdocumentgrid',

  data: {
    totalCount: 0
  },

  stores: {
    documents: {
      autoLoad: true,
      model: 'Tel100.model.eflow.Motion',
      proxy: {
        type: 'ajax',
        url: '/api/eflow/motions',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      },
      listeners: {
        beforeload: 'onBeforeLoad',
        load: 'onLoad'
      }
    }
  }
});
