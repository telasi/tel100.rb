Ext.define('Telasi.view.document.FoldersController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.documentfolders',
  requires: [
    'Telasi.view.document.editor.Editor',
    'Telasi.model.document.Base',
    'Telasi.view.document.editor.ViewModel'
  ],

  onNewDocument: function(folders) {
    var docTab = this.getView().up().down('documentTab');
    var doc = Ext.create('Telasi.model.document.Base', {
      language: 'ka',
      direction: window.Telasi.documentUtils.getDefaultDirection().id,
      type_id: window.Telasi.documentUtils.getDefaultType().id,
    });
    var model = new Telasi.view.document.editor.ViewModel({ data: { doc: doc } });
    var editor = Ext.create('Telasi.view.document.editor.Editor', { viewModel: model });
    docTab.controller.openTab( editor );
    editor.on('document-sent', function(doc) {
      docTab.controller.removeTab(editor);
      // TODO: refresh document's list
    });
  },
});
