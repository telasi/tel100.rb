Ext.define('Telasi.view.document.motions.EditorDialog', {
  extend: 'Telasi.component.common.FitWindow',
  xtype: 'documentEditorDialog',
  closable: true,
  resizable: true,
  bodyBorder: false,
  border: false,
  modal: true,
  title: '<i class="fa fa-send-o"></i> ადრესატების დამატება',
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
    editable: true,
    region: 'center'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    border: false,
    padding: 5,
    items: [{
      xtype: 'tbspacer',
      flex: 1
    }, {
      xtype: 'button',
      formBind: true,
      text: 'OK',
      scale: 'medium',
      width: 200,
      handler: function() {
        this.up('documentEditorDialog').close();
      }
    }, {
      xtype: 'tbspacer',
      flex: 1
    }]
  }]
});
