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
    xtype: 'datefield',
    fieldLabel: 'ვადა',
    width: '100%',
    bind: '{doc.due_date}',
    format: Ext.Date.defaultFormat,
    emptyText: 'შესრულების ვადა'
  }, {
    xtype: 'datefield',
    fieldLabel: 'საკონტროლო',
    width: '100%',
    bind: '{doc.alert_date}',
    format: Ext.Date.defaultFormat,
    emptyText: 'საკონტროლო ვადა'
  }, {
    xtype: 'combo',
    store: 'documentDirections',
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
