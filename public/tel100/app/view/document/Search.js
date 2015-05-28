Ext.define('Tel100.view.document.Search', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentsearch',

  viewModel: {
    type: 'documentsearch'
  },

  height: 400,
  width: 800,
  layout: 'border',
  closeAction: 'hide',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.search.ui.search}'
  },

  items: [{
    xtype: 'documentfoldersearch',
    width: 300,
    title: '',
    titleCollapse: false,
    region: 'west',
    split: true,
    listeners: {
      searchstart: 'onSearch'
    }
  }, {
    xtype: 'documentgridpanel',
    region: 'center',
    listeners: {
      itemdblclick: 'onGridpanelItemDblClick'
    }
  }],

  onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    var parent = this.getParentDocument();
    if (record.get('status') !== 0 && record.id !== parent.id) {
      this.fireEvent('documentselected', record);
      this.close();
    }
  },

  onSearch: function(url, params) {
    var grid = this.down('documentgridpanel');
    grid.getController().setStoreConfig({url: url, extraParams: params });
    grid.refresh();
  },

  getParentDocument: function() {
    return this.getViewModel().get('document');
  },

  setParentDocument: function(doc) {
    this.getViewModel().set('document', doc);
  }
});
