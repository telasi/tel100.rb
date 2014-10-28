Ext.define('Telasi.view.document.motions.EditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorController',
  requires: [
    'Telasi.view.document.Editor',
    'Telasi.model.document.Base'
  ],

  onEditMotions: function(item, event) {
    var editor = item.up('documentMotionsEditor');
    var dialog = Ext.create('Telasi.view.document.motions.EditorDialog', {
      store: editor.getStore()
    });
    dialog.show();
  }
});
