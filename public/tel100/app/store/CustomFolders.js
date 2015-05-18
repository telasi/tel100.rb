Ext.define('Tel100.store.CustomFolders', {
  extend: 'Ext.data.Store',

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'customfolders',
      autoLoad: false,
      model: 'Tel100.model.folder.Base'
    }, cfg)]);
  }
});
