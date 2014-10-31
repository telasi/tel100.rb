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

  getDefaultType: function() {
    var types = Ext.data.StoreManager.lookup('documentTypes');
    return types.getAt(0);
  },

  getDirectionName: function(id) {
    var store = Ext.data.StoreManager.lookup('document-directions');
    var direction = store.getById(id);
    return direction.get('name');
  },

  getDefaultDirection: function() {
    var directions = Ext.data.StoreManager.lookup('document-directions');
    return directions.getAt(0);
  },

  getStatusName: function(id) {
    var store = Ext.data.StoreManager.lookup('document-statuses');
    var status = store.getById(id);
    return status.get('name');
  }
}, function() {
  window.Telasi.documentUtils = new Telasi.view.document.Utils();
});
