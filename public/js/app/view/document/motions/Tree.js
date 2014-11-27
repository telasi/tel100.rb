Ext.define('Telasi.view.document.motions.Tree', {
  extend: 'Ext.tree.Panel',
  xtype: 'document-motiontree',
  requires: [
    'Telasi.view.document.motions.TreeController',
    'Telasi.view.document.Utils'
  ],

  controller: 'document-motiontree-controller',
  rootVisible: false,
  // loadMask: true,
  hideHeaders: true,
  bodyCls: 'x-tree-noicon',
  useArrows: true,

  listeners: {
    afterrender: 'refresh',
  },

  columns: [{
    xtype: 'treecolumn',
    text: 'ადრესატი',
    dataIndex: 'name',
    flex: 1,
    sortable: false,
    renderer: function(value, metaInfo, record) {
      Telasi.documentUtils.statusify(value, metaInfo, record);
      return Telasi.hrUtils.renderStructure( metaInfo.record );
    }
  }, {
    text: 'სტატუსი',
    dataIndex: 'status',
    width: 120,
    renderer: function(value, metaInfo, record) {
      var status = Telasi.documentUtils.statusify(value, metaInfo, record, { status: value });
      return Telasi.documentUtils.statusRender(value, record.get('receiver_role'));
    }
  }],
  tools: [{
    type: 'refresh',
    tooltip: 'მოძრაობების განახლება',
    callback: function (grid) {
      grid.controller.refresh();
    }
  }],
});
