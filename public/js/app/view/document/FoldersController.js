Ext.define('Telasi.view.document.FoldersController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.documentfolders',
  requires: [
    'Telasi.view.document.editor.Editor',
    'Telasi.model.document.Base',
    'Telasi.view.document.ViewModel'
  ],

  onNewDocument: function(folders) {
    var docTab = this.getView().up().down('documentTab');
    var types = Ext.data.StoreManager.lookup('documentTypes');
    var directions = Ext.data.StoreManager.lookup('documentDirections');
    var doc = Ext.create('Telasi.model.document.Base', {
      language: 'ka',
      direction: directions.data.items[0].id,
      typeId: types.data.items[0].id,
    });
    var model = new Telasi.view.document.ViewModel({ data: { doc: doc } });
    var editor = Ext.create('Telasi.view.document.editor.Editor', { viewModel: model });
    docTab.controller.openTab( editor );
  },
});
