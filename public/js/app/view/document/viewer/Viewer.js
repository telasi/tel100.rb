Ext.define('Telasi.view.document.viewer.Viewer', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-viewer',
  controller: 'viewerController',
  layout: 'border',
  border: false,

  requires: [
    'Telasi.view.document.viewer.Main',
    'Telasi.view.document.viewer.Detail',
    'Telasi.view.document.viewer.ViewerController',
    'Telasi.view.document.comment.Grid'
  ],

  bind: {
    title: '{doc.docnumber}'
  },

  items: [{
    xtype: 'document-viewer-main',
    region: 'center',
  }, {
    xtype: 'document-viewer-detail',
    region: 'east',
    width: 400,
    split: true,
  }, {
    xtype: 'document-comments-grid',
    region: 'south',
    height: 400,
    split: true,
    collapsible: true,
    title: '<i class="fa fa-comments"></i> კომენტარები',
  }],

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    border: false,
    items: [{
      xtype: 'button',
      formBind: true,
      bind: {
        text: '<i class="fa fa-print"></i> ბეჭდვა'
      },
      handler: 'onPrintDocument'
    }, {
      xtype: 'button',
      formBind: true,
      bind: {
        text: '<i class="fa fa-list-alt"></i> ბარათი'
      },
      handler: 'onPrintCard',
    }]
  }]
});
