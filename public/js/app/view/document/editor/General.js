Ext.define('Telasi.view.document.editor.General', {
  extend: 'Ext.form.Panel',
  border: false,
  xtype: 'document-editor-general',
  requires: [
    'Telasi.view.document.editor.DirectionInProperties',
    'Telasi.model.document.Type',
    'Telasi.store.document.Type',
    'Telasi.store.document.Direction',
    'Telasi.store.Language',
  ],
  items: [{
    xtype: 'combo',
    store: 'documentTypes',
    displayField: 'name',
    valueField: 'id',
    editable: false,
    emptyText: 'აარჩიეთ ტიპი',
    fieldLabel: 'ტიპი',
    width: '100%',
    bind: '{doc.type_id}'
  }, {
    xtype: 'datefield',
    format: Ext.Date.defaultFormat,
    fieldLabel: 'დოკუმენტის თარიღი',
    bind: '{doc.docdate}',
    width: '100%',
  }, {
    xtype: 'numberfield',
    fieldLabel: 'გვერდები',
    width: '100%',
    bind: '{doc.page_count}',
    minValue: 0,
    allowDecimals: false,
  }, {
    xtype: 'numberfield',
    fieldLabel: 'დანართები',
    width: '100%',
    bind: '{doc.additions_count}',
    minValue: 0,
    allowDecimals: false,
  }, {
    xtype: 'combo',
    store: 'document-directions',
    displayField: 'name',
    valueField: 'id',
    editable: false,
    emptyText: 'აარჩიეთ მიმართულება',
    fieldLabel: 'მიმართულება',
    width: '100%',
    bind: '{doc.direction}'
  }, {
    xtype: 'document-editor-direction-in-properties',
    flex: 1,
    bind: {
      visible: '{directionIn}'
    }
  }]
});
