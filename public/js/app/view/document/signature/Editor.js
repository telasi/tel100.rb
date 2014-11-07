Ext.define('Telasi.view.document.signature.Editor', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-signature-editor',
  controller: 'signatureEditorController',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.signature.EditorController',
    'Telasi.view.document.signature.Grid',
  ],
  border: false,
  items: [{
    xtype: 'document-signatures-grid',
    editable: false,
    shortColumns: true,
    store: {
      fields: [ 'signature_id', 'signature_type', 'name', 'organization', 'image', 'sign_group' ],
    },
    border: false,
  }],
  tools: [{
    type: 'plus',
    tooltip: 'ვიზირებების დამატება',
    callback: function (editor) {
      editor.controller.onEditSignatures(editor);
    }
  }]
});
