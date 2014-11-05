Ext.define('Telasi.view.document.authors.EditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.authorsEditorController',
  requires: [
    'Telasi.model.document.Base',
    'Telasi.view.document.authors.EditorDialog'
  ],

  onEditAuthors: function(editor) {
    var grid = editor.down('document-authors-grid');
    var dialog = Ext.create('Telasi.view.document.authors.EditorDialog', { store: grid.getStore()});
    dialog.show();
  }
});
