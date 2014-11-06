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
    store: {
      fields: [ 'receiver_id', 'receiver_type', 'name', 'organization', 'motion_text', { name: 'due_date', type: 'date' }, 'image' ]
    },
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
