Ext.define('Telasi.view.document.signature.ViewerEditor', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-signature-viewer-editor',
  controller: 'document-signaturevieweditor-controller',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.signature.Grid',
    'Telasi.view.document.signature.ViewerEditorController'
  ],
  listeners: {
    afterrender: 'refresh',
  },
  border: false,
  items: [{
    xtype: 'document-signatures-grid',
    editable: false,
    shortColumns: true,
    showStatus: true,
    border: false,
  }],
  tools: [{
    type: 'plus',
    tooltip: 'ვიზირებების მართვა',
    handler: 'editMotions'
  }, {
    type: 'refresh',
    tooltip: 'მონაცემების განახლება',
    handler: 'refresh'
  }]
});
