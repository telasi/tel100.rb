Ext.define('Telasi.view.document.motions.EditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorController',
  requires: [
    'Telasi.view.document.Editor',
    'Telasi.model.document.Base'
  ],

  onEditMotions: function(editor) {
    // var editor = item.up('documentMotionsEditor');
    var grid = editor.down('document-motions-grid');
    var dialog = Ext.create('Telasi.view.document.motions.EditorDialog', {
      store: grid.getStore()
    });
    dialog.show();
  }
});
