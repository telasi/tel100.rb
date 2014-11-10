Ext.define('Telasi.view.document.viewer.MotionTree', {
  extend: 'Ext.tree.Panel',
  xtype: 'document-viewer-motiontree',

  rootVisible: true,
  loadMask: true,
  hideHeaders: true,
  columns: [{
      xtype: 'treecolumn',
      text: 'Name',
      dataIndex: 'name',
      flex: 1,
      sortable: false,
      renderer: function(value, metaInfo) {
        return window.Telasi.hrUtils.renderStructure( metaInfo.record );
      },
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
