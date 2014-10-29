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
