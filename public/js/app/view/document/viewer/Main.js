Ext.define('Telasi.view.document.viewer.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-main',
  layout: 'border',
  border: false,

  requires: [
    'Telasi.view.document.viewer.Header'
  ],

  defaults: {
    bodyPadding: 5,
  },

  items: [{
    xtype: 'document-viewer-header',
    region: 'north'
  }, {
    xtype: 'panel',
    region: 'center',
    autoScroll: true,
    bind: {
      html: '{doc.body}',
    }
  }]
});
