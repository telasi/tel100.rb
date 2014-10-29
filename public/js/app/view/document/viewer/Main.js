Ext.define('Telasi.view.document.viewer.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-main',
  layout: 'border',
  border: false,

  requires: [
    'Telasi.view.document.viewer.Header'
  ],

  layout: 'border',

  defaults: {
    bodyPadding: 5,
  },

  items:[
  {
    xtype: 'document-viewer-header',
    region: 'north'
  },{
    xtype: 'panel',
    autoScroll: true,
    bind: {
      html: '{currentDocument.body}',
    },
    region: 'center'
  }],
});