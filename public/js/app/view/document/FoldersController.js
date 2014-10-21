Ext.define('Telasi.view.document.FoldersController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.documentfolders',
  requires: [
    'Telasi.view.document.Editor',
    'Telasi.model.document.Base'
  ],

  onNewDocument: function(button) {
    var docTab = this.getView().up().down('documentTab');
    var types = Ext.data.StoreManager.lookup('documentTypes');
    var directions = Ext.data.StoreManager.lookup('documentDirections');

    var doc = Ext.create('Telasi.model.document.Base', {
      language: 'ka',
      direction: directions.data.items[0].id,
      type_id: types.data.items[0].id,
    });

    var docModel = new Ext.app.ViewModel({
      data: {
        doc: doc
      },
      formulas: {
        directionIn: function(get) {
          return get('doc.direction') === 'in';
        },
        typeName: function(get) {
          var typeId = get('doc.type_id');
          var store = Ext.data.StoreManager.lookup('documentTypes');
          var type = store.getById(typeId);
          return type.get('name');
        },
        // typeNameGenitive: function(get) {
        //   var type = get('doc.type_id');
        //   return type;
        // },
      }
    });

    var editor = Ext.create('Telasi.view.document.Editor', {
      viewModel: docModel
    });
    docTab.controller.openTab( editor );
  },
});
