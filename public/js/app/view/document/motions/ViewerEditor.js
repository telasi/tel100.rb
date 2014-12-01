Ext.define('Telasi.view.document.motions.ViewerEditor', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-motions-viewer-editor',
  controller: 'document-motionvieweditor-controller',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.motions.Grid',
    'Telasi.view.document.motions.ViewerEditorController'
  ],
  listeners: {
    afterrender: 'refresh',
  },
  border: false,
  items: [{
    xtype: 'document-motions-grid',
    editable: false,
    shortColumns: true,
    border: false,
  }],
  tools: [{
    type: 'plus',
    tooltip: 'ადრესატების მართვა',
    handler: 'editMotions'
  }, {
    type: 'refresh',
    tooltip: 'მონაცემების განახლება',
    handler: 'refresh'
  }]
});
