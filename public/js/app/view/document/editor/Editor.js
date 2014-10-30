Ext.define('Telasi.view.document.editor.Editor', {
  extend: 'Ext.form.Panel',
  xtype: 'document-editor',
  border: false,
  controller: 'documenteditor',
  requires: [
    'Telasi.view.document.editor.Main',
    'Telasi.view.document.editor.Details',
    'Telasi.view.document.editor.EditorController',
  ],
  bind: {
    title: '<i class="fa fa-bookmark-o"></i> ახალი {typeName}'
  },
  closable: true,
  layout: 'border',
  items: [{
    xtype: 'document-editor-main',
    border: true,
    region: 'center'
  }, {
    xtype: 'document-editor-details',
    region: 'east',
    width: 400,
    split: true
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    border: false,
    items: [{
      xtype: 'button',
      bind: {
        text: '<i class="fa fa-send-o"></i> {typeNameGenitive} გაგზავნა'
      },
      handler: 'onSendDocument',
    }]
  }]
});
