Ext.define('Telasi.view.document.motions.EditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorController',
  requires: [
    'Telasi.view.document.Editor',
    'Telasi.model.document.Base'
  ],

  onEditMotions: function() {
    var dialog = Ext.create('Telasi.view.document.motions.EditorDialog');
    dialog.show();
  }
});
