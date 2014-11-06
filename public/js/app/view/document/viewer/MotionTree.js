Ext.define('Telasi.view.document.viewer.MotionTree', {
  extend: 'Ext.tree.Panel',
  xtype: 'document-viewer-motiontree',

  rootVisible: true,
  loadMask: true,
  hideHeaders: true,
  columns: [{
      xtype: 'treecolumn',
      text: 'Name',
      dataIndex: 'receiver_full_name',
      flex: 1,
      sortable: false
  }],

  initComponent: function(){
    var me = this;
    var doc = this.up('document-viewer-viewer').getViewModel().data.doc;

    Ext.Ajax.request({
        url: '/api/docs/motions',
        method: 'GET',
        params: { id: doc.getId() },
        success: function(data) {
          var Store = me.getStore();
          Store.loadRawData(JSON.parse(data.responseText));
        }
    });

    this.callParent(arguments);    
  }
});
