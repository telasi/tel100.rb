Ext.define('Telasi.view.document.viewer.MotionPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-motionpanel',

  requires: [
     'Telasi.view.document.viewer.MotionTree',
  ],

  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  items: [
          {
            xtype: 'document-viewer-motiontree',
            flex: 1,
          },
          {
            xtype: 'panel',
            closable: true,
            title: this.tree,
            height: 200,
          },
          {
            xtype: 'button',
            handler: function(){
              alert('asda');
            }
           
          }
  ],
});
