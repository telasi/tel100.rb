Ext.define('Telasi.view.document.viewer.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-main',
  layout: 'border',

  requires: [
    'Telasi.view.document.viewer.Header',
    'Telasi.view.document.comment.Grid'
  ],

  defaults: {
    bodyPadding: 5,
  },

  items: [{}, {
    xtype: 'document-viewer-header',
    region: 'north'
  }, {
    xtype: 'panel',
    region: 'center',
    autoScroll: true,
    border: false,
    bind: {
      html: '{doc.body}',
    }
  }, {
    xtype: 'document-comments-grid',
    region: 'south',
    height: 200,
    split: true,
    collapsible: true,
    title: '<i class="fa fa-comments"></i> კომენტარები',
    bodyPadding: 0
  }]
});
