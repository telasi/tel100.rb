Ext.define('Telasi.view.document.Utils', {
  extend: 'Ext.Base',
  requires: [
    'Telasi.store.document.Direction',
    'Telasi.store.document.Status',
    'Telasi.store.document.Type',
  ],

  getType: function(id) {
    var store = Ext.data.StoreManager.lookup('documentTypes');
    return store.getById(id);
  },

  getTypeName: function(id) {
    var type = window.Telasi.documentUtils.getType(id);
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

  getDirection: function(id) {
    var store = Ext.data.StoreManager.lookup('document-directions');
    return store.getById(id);
  },

  getDefaultDirection: function() {
    var directions = Ext.data.StoreManager.lookup('document-directions');
    return directions.getAt(0);
  },

  getStatus: function(id, metaInfo) {
    var store = Ext.data.StoreManager.lookup('document-statuses');
    return store.getById(id);
  },

  colorStatus: function(value, metaInfo){
    var status = window.Telasi.documentUtils.getStatus(value);
    if (status) { metaInfo.tdCls = status.get('class') };
    return status;
  },

  getStatusText: function(id, metaInfo) {
    window.Telasi.documentUtils.colorStatus(id, metaInfo);
    var store = Ext.data.StoreManager.lookup('document-statuses');
    var record = store.getById(id);
    return record ? record.data.name : "";
  },

  getDate: function(value){
    return Ext.Date.format(Ext.Date.parse(value,'c'), Ext.Date.defaultFormat);
  },

// signature role

  getSignatureRole: function(id) {
    var store = Ext.data.StoreManager.lookup('document-signature-roles');
    return store.getById(id);
  },

// doc grid renderings

  statusify: function(value, metaInfo, record, opts) {
    var statusId = ( opts && opts.status ) || record.get('status');
    var status = Telasi.documentUtils.getStatus(statusId);
    metaInfo.tdCls += ' ' + status.get('class');
    var unread = record.get('is_read') === 0;
    if (unread) { metaInfo.tdCls += ' text-new'; }
    return status;
  },

  statusRender: function(status, record) {
    var role = record && (record.get('my_role') || record.get('role'));
    var name = status.get('name');
    if (role === 'signee' || role === 'author') {
      name = status.get('name_sign');
    }
    return [ '<i class="fa ', status.get('icon'), '"></i> ', name ].join('');
  },

  gridStatusRenderer: function(value, metaInfo, record) {
    var status = Telasi.documentUtils.statusify(value, metaInfo, record);
    return Telasi.documentUtils.statusRender(status, record);
  },

  gridMyStatusRenderer: function(value, metaInfo, record) {
    var myStatus = record.get('my_status');
    var status = Telasi.documentUtils.statusify(value, metaInfo, record, { status: myStatus });
    var text = Telasi.documentUtils.statusRender(status, record);
    var unread = record.get('is_read') === 0;
    if (unread) { text += ' <span class="label label-danger">new</span>'; }
    return text;
  },

  gridTextRenderer: function(value, metaInfo, record) {
    Telasi.documentUtils.statusify(value, metaInfo, record);
    return value;
  },

  gridDateRenderer: function(value, metaInfo, record) {
    Telasi.documentUtils.statusify(value, metaInfo, record);
    return Ext.Date.format(value, Ext.Date.defaultFormat);
  },

  gridDirectionRenderer: function(value, metaInfo, record) {
    Telasi.documentUtils.statusify(value, metaInfo, record);
    var direction = window.Telasi.documentUtils.getDirection(value);
    return direction.get('name');
  },

  gridTypeRenderer: function(value, metaInfo, record) {
    Telasi.documentUtils.statusify(value, metaInfo, record);
    return window.Telasi.documentUtils.getTypeName(value);
  }
}, function() {
  Telasi.documentUtils = new Telasi.view.document.Utils();
});
