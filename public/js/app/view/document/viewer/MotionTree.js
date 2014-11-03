Ext.define('Telasi.view.document.viewer.MotionTree', {
  extend: 'Ext.tree.Panel',
  xtype: 'document-viewer-motiontree',

  requires: [
    'Telasi.store.document.MotionTree',
  ],

  rootVisible: false,
  loadMask: true,
  columns: [{
      xtype: 'treecolumn',
      text: 'Name',
      dataIndex: 'sender_full_name',
      flex: 1,
      sortable: false
  }],

  // store: 'MotionTree',

  initComponent: function(){
    var store1 = Ext.create('Telasi.store.document.MotionTree');
    store1.load({ id: this.up('document-viewer-viewer').getViewModel().data.doc.id} );
    var jsonData = store1.data.items;
    // Ext.apply(this,{
    //   store: store1
    // });
    
    this.callParent(arguments);
  }
});
