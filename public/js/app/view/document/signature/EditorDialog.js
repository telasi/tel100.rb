Ext.define('Telasi.view.document.signature.EditorDialog', {
  extend: 'Telasi.component.common.FitWindow',
  xtype: 'doc-signature-editor-dialog',
  closable: true,
  resizable: true,
  bodyBorder: false,
  border: false,
  modal: true,
  title: '<i class="fa fa-edit"></i> ხელმოწერების დამატება',
  requires: [
    'Telasi.view.common.hr.HRtree',
    'Telasi.view.document.signature.Grid',
    'Telasi.view.document.signature.EditorDialogController'
  ],
  layout: 'border',
  controller: 'signaturesEditorDialogController',
  items: [{
    xtype: 'HRtree',
    region: 'west',
    width: 400,
    split: true,
    selectionModel: 'SINGLE',
  }, {
    xtype: 'document-signatures-grid',
    editable: true,
    region: 'center'
  }]
});
