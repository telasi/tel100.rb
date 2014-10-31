Ext.define('Telasi.view.document.viewer.MotionTree', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-motiontree',
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  
  items: [
          {
            xtype: 'treepanel',
            store: Ext.create('Telasi.store.document.MotionTree',{
            }),
            flex: 1,
          },
          {
            xtype: 'panel',
            closable: true,
            html: 'hi',
            height: 200,
          }
  ]
});
