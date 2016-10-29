Ext.define('Tel100.view.document.file.ModifyPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentfilemodifypanel',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json',
    'Ext.app.bind.Formula'
  ],

  data: {
    fileCount: 0,
    editable: false,
    is_auto_signee: false
  },

  stores: {
    files: {
      listeners: {
        datachanged: function() {
          var store = this;
          this.viewModel.set('fileCount', store.getCount());
          this.view.fireEvent('fileschanged', store);
        }
      },
      autoLoad: true,
      model: 'Tel100.model.document.File',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}'
        },
        url: '/api/documents/filestemp',
        reader: {
          type: 'json'
        }
      }
    }
  },
  formulas: {
    notEditable: function(get) {
      return !get('editable');
    },
    notDeletable: function(get) {
      return !get('deletable');
    }
  }

});