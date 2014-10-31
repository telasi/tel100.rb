Ext.define('Telasi.view.document.viewer.Viewer', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-viewer',

  requires: [
    'Telasi.view.document.viewer.Main',
    'Telasi.view.document.viewer.Detail',
    'Telasi.view.document.viewer.DocumentViewModel',
  ],

  layout: 'border',

  bind: {
    title: '{doc.docnumber}'
  },

  items: [{
    xtype: 'document-viewer-main',
    region: 'center',
  },{
    xtype: 'document-viewer-detail',
    region: 'east',
    width: 400,
    split: true,
  }],
});
