Ext.define('Telasi.view.document.editor.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditor',
  border: false,
  requires: [
    'Telasi.view.document.editor.Main',
    'Telasi.view.document.editor.Details',
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
});
