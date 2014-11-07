Ext.define('Telasi.view.document.authors.EditorDialog', {
  extend: 'Telasi.component.common.FitWindow',
  xtype: 'authorsEditorDialog',
  closable: true,
  resizable: true,
  bodyBorder: false,
  border: false,
  modal: true,
  title: '<i class="fa fa-copyright"></i> ვიზატორების დამატება',
  requires: [
    'Telasi.view.common.hr.HRtree',
    'Telasi.view.document.authors.Grid',
    'Telasi.view.document.authors.EditorDialogController'
  ],
  layout: 'border',
  controller: 'authorsEditorDialogController',
  items: [{
    xtype: 'HRtree',
    region: 'west',
    width: 400,
    split: true,
    selectionModel: 'SINGLE',
  }, {
    xtype: 'document-authors-grid',
    editable: true,
    region: 'center'
  }]
});
