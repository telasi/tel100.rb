Ext.define('Telasi.view.document.motions.EditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorController',
  requires: [
    'Telasi.model.document.Base',
    'Telasi.view.document.motions.EditorDialog'
  ],

  onEditMotions: function(editor) {
    var grid = editor.down('document-motions-grid');
    var dialog = Ext.create('Telasi.view.document.motions.EditorDialog', { store: grid.getStore() });
    dialog.show();
  }
});
