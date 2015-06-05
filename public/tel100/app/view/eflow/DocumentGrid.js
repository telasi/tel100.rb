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

  onBeforeLoad: function(store, operation, eOpts) {
    this.setLoading(true);
  },

  onLoad: function(store, records, successful, eOpts) {
    this.setLoading(false);
    this.getViewModel().set('totalCount', store.getTotalCount());
  }
});

Ext.define('Tel100.view.eflow.DocumentGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.eflowdocumentgrid'
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
