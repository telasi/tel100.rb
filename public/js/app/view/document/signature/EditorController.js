Ext.define('Telasi.view.document.signature.EditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.signatureEditorController',
  requires: [
    'Telasi.view.document.signature.EditorDialog'
  ],

  onEditSignatures: function(editor) {
    var grid = editor.down('document-signatures-grid');
    var dialog = Ext.create('Telasi.view.document.signature.EditorDialog', { store: grid.getStore() });
    dialog.show();
  }
});
