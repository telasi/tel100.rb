Ext.define('Telasi.view.document.editor.Main', {
  extend: 'Ext.form.Panel',
  xtype: 'document-editor-main',
  layout: 'border',
  border: false,
  items: [{
    xtype: 'textfield',
    emptyText: 'ჩაწერეთ მოკლე შინაარსი',
    region: 'north',
    padding: '5 5 0 5',
    allowBlank: false,
    bind: {
      value: '{doc.subject}'
    }
  }, {
    xtype: 'htmleditor',
    padding: 5,
    emptyText: 'ჩაწერეთ დაწვრილებითი შინაარსი',
    region: 'center',
    bind: { value: '{doc.body}' }
  }],
});
