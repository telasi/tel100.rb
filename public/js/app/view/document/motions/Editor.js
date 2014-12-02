Ext.define('Telasi.view.document.motions.Editor', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-motions-editor',
  controller: 'motionsEditorController',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.motions.EditorController',
    'Telasi.view.document.motions.Grid',
  ],
  border: false,
  items: [{
    xtype: 'document-motions-grid',
    editable: false,
    shortColumns: true,
    showStatus: false,
    border: false,
  }],
  tools: [{
    type: 'plus',
    tooltip: 'ადრესატების დამატება',
    callback: function (editor) {
      editor.controller.onEditMotions(editor);
    }
  }]
});
