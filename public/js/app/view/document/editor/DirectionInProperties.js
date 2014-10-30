Ext.define('Telasi.view.document.editor.DirectionInProperties', {
  extend: 'Ext.form.FieldSet',
  xtype: 'document-editor-direction-in-properties',
  margin: '10px 0',
  padding: 10,
  bind: {
    title: 'შემოსული {typeNameGenitive} პარამეტრები'
  },
  items: [{
      xtype: 'textfield',
      width: '100%',
      fieldLabel: 'ნომერი',
      emptyText: 'ჩაწერეთ ნომერი'
    }, {
    xtype: 'panel',
    border: false,
    items: [{
      xtype: 'datefield',
      emptyText: 'აარჩიეთ თარიღი',
      format: Ext.Date.defaultFormat,
      width: '100%',
      fieldLabel: 'თარიღი'
    }]
  }], 
});
