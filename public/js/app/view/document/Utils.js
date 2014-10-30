Ext.define('Telasi.view.document.Utils', {
  extend: 'Ext.Base',
  getTypeName: function(id) {
    var store = Ext.data.StoreManager.lookup('documentTypes');
    var type = store.getById(id);
    return type.get('name');
  },

  getTypeNameGenitive: function(id) {
    var typeName = this.getTypeName(id);
    return typeName.substr(0, typeName.length - 1) + 'ის'
  },
});

var documentUtils = new Telasi.view.document.Utils();
