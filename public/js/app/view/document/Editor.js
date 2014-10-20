Ext.define('Telasi.view.document.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditor',
  requires: [
    'Telasi.model.document.Type',
    'Telasi.store.document.Type',
  ],
  // controller: 'documentEditor',

  title: 'ახალი დოკუმენტი',
  closable: true,

  items: [{
    xtype: 'panel',
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: 5
    },
    items: [{
      xtype: 'combo',
      store: 'documentTypes',
      displayField: 'name',
      valueField: 'id',
      editable: false,
      autoSelect: true,
      emptyText: 'სახეობა',
      padding: '0 5px 0 0'
    }, {
      xtype: 'datefield',
      emptyText: 'თარიღი',
      format: 'd/m/Y',
      padding: '0 5px 0 0'
    }, {
      xtype: 'textfield',
      emptyText: 'ნომერი',
      flex: 1
    }, ],
  }],
});
