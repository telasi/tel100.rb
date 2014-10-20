Ext.define('Telasi.view.document.FoldersController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.documentfolders',
  requires: [
    'Telasi.view.document.Editor'
  ],

  onNewDocument: function(button) {
    var docTab = this.getView().up().down('documentTab');
    var editor = Ext.create('Telasi.view.document.Editor');
    docTab.controller.openTab( editor );
  },
});
