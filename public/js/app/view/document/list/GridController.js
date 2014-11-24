Ext.define('Telasi.view.document.list.GridController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentgrid',
  requires: [
    'Telasi.view.document.editor.Editor',
    'Telasi.view.document.viewer.Viewer'
  ],

  control: {
    '#': {
      celldblclick: 'openDocument'
    }
  },

  createViewerComponent: function(record) {
    return new Ext.create('Telasi.view.document.viewer.Viewer',{
      closable: true,
      viewModel: Ext.create('Telasi.view.document.editor.ViewModel', { 
        links: {
          doc: {
            reference: 'Telasi.model.document.Base',
            id: record.id
          }
        } 
      })
    }) 
  },

  createEditorComponent: function(record) {
    var self = this;
    var doc = Ext.create('Telasi.model.document.Base', record.data);
    var model = new Telasi.view.document.editor.ViewModel({ data: { doc: doc } });
    var editor = Ext.create('Telasi.view.document.editor.Editor', { viewModel: model });
    editor.on('document-sent', function(doc) {
      var docTab = self.getView().up('documentTab');
      docTab.controller.removeTab(editor);
      docTab.controller.refreshDocuments();
    });
    return editor;
  },

  openDocument: function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var componentToOpen = this.findComponentById(record);
    if (!componentToOpen){
      if ( record.get('status') === Telasi.statuses.draft ) {
        componentToOpen = this.createEditorComponent(record);
      } else {
        componentToOpen = this.createViewerComponent(record);
      }
    };

    var docTab = this.getView().up('documentTab');
    docTab.controller.openTab( componentToOpen );
  },

  init: function() {
    this.lookupReference('pagingtoolbar').setStore(this.getStore('documents'));
  },

  findComponentById: function(record){
    var docTab = this.getView().up('documentTab');

    for(var i = 0; i < docTab.items.getCount(); i++){
      var curTab = docTab.items.get(i);
      var viewModel = curTab.getViewModel();
      if (viewModel){
        var doc =  viewModel.get('doc');
          if( doc.id === record.id ){
            return curTab;
          }
        }
    }

    return null;
  },

});
