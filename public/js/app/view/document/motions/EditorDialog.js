Ext.define('Telasi.view.document.motions.EditorDialog', {
  extend: 'Telasi.component.common.FitWindow',
  xtype: 'documentEditorDialog',
  closable: true,
  resizable: true,
  bodyBorder: false,
  border: false,
  modal: true,
  title: '<i class="fa fa-users"></i> ადრესატების დამატება',
  requires: [
    'Telasi.view.common.hr.HRtree',
    'Telasi.view.document.motions.Grid',
    'Telasi.view.document.motions.EditorDialogController'
  ],
  layout: 'border',
  controller: 'motionsEditorDialogController',
  items: [{
    xtype: 'HRtree',
    region: 'west',
    width: 400,
    split: true,
    selectionModel: 'SINGLE',
  }, {
    xtype: 'document-motions-grid',
    region: 'center'
  }]
});
