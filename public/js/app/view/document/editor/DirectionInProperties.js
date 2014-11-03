Ext.define('Telasi.view.document.editor.DirectionInProperties', {
  extend: 'Ext.form.FieldSet',
  xtype: 'document-editor-direction-in-properties',
  bind: {
    title: 'შემოსული {typeNameGenitive} პარამეტრები'
  },
  items: [{
    xtype: 'textfield',
    width: '100%',
    fieldLabel: 'ნომერი',
    emptyText: 'ჩაწერეთ ნომერი',
    bind: '{doc.original_number}'
  }, {
    xtype: 'datefield',
    emptyText: 'აარჩიეთ თარიღი',
    format: Ext.Date.defaultFormat,
    width: '100%',
    fieldLabel: 'თარიღი',
    bind: '{doc.original_date}'
  }], 
});
