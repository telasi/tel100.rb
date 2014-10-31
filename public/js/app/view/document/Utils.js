Ext.define('Telasi.view.document.Utils', {
  extend: 'Ext.Base',
  requires: [
    'Telasi.store.document.Direction',
    'Telasi.store.document.Status',
    'Telasi.store.document.Type',
  ],
  getTypeName: function(id) {
    var store = Ext.data.StoreManager.lookup('documentTypes');
    var type = store.getById(id);
    return type.get('name');
  },

  getTypeNameGenitive: function(id) {
    var typeName = this.getTypeName(id);
    return typeName.substr(0, typeName.length - 1) + 'ის'
  },

  getDirectionName: function(id) {
    var store = Ext.data.StoreManager.lookup('document-directions');
    var direction = store.getById(id);
    return direction.get('name');
  },

  getStatusName: function(id) {
    var store = Ext.data.StoreManager.lookup('document-statuses');
    var status = store.getById(id);
    return status.get('name');
  }
}, function() {
  window.Telasi.documentUtils = new Telasi.view.document.Utils();
});
