Ext.define('Telasi.view.document.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditor',
  requires: [
    'Telasi.model.document.Type',
    'Telasi.store.document.Type',
    'Telasi.store.document.Direction',
    'Telasi.store.Language',
  ],
  // controller: 'documentEditor',

  bind: {
    title: 'ახალი {typeName}'
  },
  closable: true,
  layout: 'border',

  items: [{
    xtype: 'documentEditorNorth',
    region: 'north',
  }, {
    xtype: 'documentEditorCenter',
    region: 'center'
  }],
});

Ext.define('Telasi.view.document.EditorNorth', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorNorth',
  items: [{
    xtype: 'panel',
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: '0 5px 5px 5px'
    },
    items: [{
      xtype: 'combo',
      store: 'documentTypes',
      displayField: 'name',
      valueField: 'id',
      editable: false,
      emptyText: 'აარჩიეთ ტიპი',
      padding: '0 5px 0 0',
      fieldLabel: 'ტიპი',
      labelAlign: 'top',
      width: 100,
      bind: '{doc.type_id}'
    }, {
      xtype: 'combo',
      store: 'documentDirections',
      displayField: 'name',
      valueField: 'id',
      editable: false,
      emptyText: 'აარჩიეთ მიმართულება',
      padding: '0 5px 0 0',
      fieldLabel: 'მიმართულება',
      labelAlign: 'top',
      width: 100,
      bind: '{doc.direction}'
    }, {
      xtype: 'documentEditorDirectionIn',
      flex: 1,
      bind: {
        visible: '{directionIn}'
      }
    }],
  }, {
    xtype: 'panel',
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: '0 5px 5px 5px'
    },
    items: [{
      xtype: 'combo',
      displayField: 'name',
      valueField: 'id',
      editable: false,
      emptyText: 'აარჩიეთ ენა',
      padding: '0 5px 0 0',
      fieldLabel: 'ენა',
      labelAlign: 'top',
      store: 'languages',
      width: 100,
      bind: '{doc.language}'
    }, {
      xtype: 'datefield',
      emptyText: 'აარჩიეთ თარიღი',
      format: 'd/m/Y',
      padding: '0 5px 0 0',
      fieldLabel: 'თარიღი',
      labelAlign: 'top',
      width: 100
    }, {
      xtype: 'textfield',
      emptyText: 'დატოვეთ ცარიელი ავტომატური გენერაციისთვის',
      padding: 0,
      flex: 1,
      fieldLabel: 'დოკუმენტის ნომერი',
      labelAlign: 'top'
    } ],
  }, {
    xtype: 'panel',
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: '0 5px 5px 5px'
    },
    items: [{
      xtype: 'textfield',
      emptyText: 'დოკუმენტის შინაარსი',
      flex: 1
    }]
  }],
});

Ext.define('Telasi.view.document.EditorDirectionIn', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorDirectionIn',
  items: [{
    xtype: 'panel',
    layout: {
      type: 'hbox',
      align: 'stretch',
    },
    items: [{
      xtype: 'datefield',
      emptyText: 'აარჩიეთ თარიღი',
      format: 'd/m/Y',
      fieldLabel: 'შემოსული დოკუმენტის თარიღი',
      labelAlign: 'top'
    }, {
      xtype: 'textfield',
      emptyText: 'ჩაწერეთ გარე დოკუმენტის ნომერი',
      fieldLabel: 'დოკუმენტის ნომერი',
      labelAlign: 'top',
      flex: 1,
      padding: '0 0 0 5px'
    }]
  }], 
});

Ext.define('Telasi.view.document.EditorCenter', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorCenter',
  layout: 'fit',
  items: [{
    xtype: 'htmleditor',
    padding: 5
  }],
});
