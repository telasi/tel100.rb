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
    xtype: 'panel',
    layout: 'border',
    region: 'center',
    border: false,
    items: [{
      xtype: 'document-motions-grid',
      editable: true,
      region: 'center'
    }, {
      xtype: 'panel',
      region: 'south',
      text: 'top control',
      split: true,
      title: '<i class="fa fa-exchange"></i> დაკავშირებული მოძრაობა',
      height: 200,
      // hidden: true,
      items: [{
        xtype: 'label',
        text: 'ok'
      }]
    }]
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
      text: '<strong><span class="text-success"><i class="fa fa-save"></i> მონაცემების შენახვა</span></stong>',
      scale: 'medium'
    }, {
      xtype: 'button',
      formBind: true,
      text: '<span class="text-danger"><i class="fa fa-times"></i> გაუქმება</span>',
      scale: 'medium' 
    }, {
      xtype: 'tbspacer',
      flex: 1
    }]
  }]
});
