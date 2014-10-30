Ext.define('Telasi.view.document.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.base-document-view-model',
  formulas: {
    directionIn: function(get) {
      return get('doc.direction') === 'in';
    },

    typeName: function(get) {
      var typeId = get('doc.typeId');
      var store = Ext.data.StoreManager.lookup('documentTypes');
      var type = store.getById(typeId);
      return type.get('name');
    },

    typeNameGenitive: function(get) {
      var typeName = get('typeName');
      return typeName.substr(0, typeName.length - 1) + 'ის';
    },
  }
});
