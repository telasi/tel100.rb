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
    xtype: 'panel',
    layout: 'border',
    region: 'center',
    items: [{
      xtype: 'documentEditorNorth',
      region: 'north',
    }, {
      xtype: 'documentEditorCenter',
      region: 'center'
    }]
  }, {
    xtype: 'documentEditorEast',
    region: 'east',
    width: 300,
    split: true
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
    items: [],
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
      xtype: 'textfield',
      emptyText: 'დატოვეთ ცარიელი ავტომატური გენერაციისთვის',
      padding: 0,
      flex: 1,
      // fieldLabel: 'დოკუმენტის ნომერი',
      labelAlign: 'top',
      bind: {
        fieldLabel: '{typeNameGenitive} ნომერი'
      }
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

Ext.define('Telasi.view.document.EditorCenter', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorCenter',
  layout: 'fit',
  items: [{
    xtype: 'htmleditor',
    padding: 5
  }],
});

Ext.define('Telasi.view.document.EditorEast', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorEast',
  layout: 'accordion',
  bodyPadding: 0,
  defaults: {
    bodyPadding: 5,
    bodyBorder: false,
    hideCollapseTool: true
  },

  items: [{
    xtype: 'documentEditorMain',
    title: 'ძირითადი'
  }, {
    xtype: 'panel',
    html: 'ადრესატები',
    title: 'ადრესატები'
  }]
});

Ext.define('Telasi.view.document.EditorMain', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorMain',
  items: [{
    xtype: 'combo',
    store: 'documentTypes',
    displayField: 'name',
    valueField: 'id',
    editable: false,
    emptyText: 'აარჩიეთ ტიპი',
    padding: '5px 0 0 0',
    fieldLabel: 'ტიპი',
    width: '100%',
    bind: '{doc.type_id}'
  }, {
    xtype: 'combo',
    store: 'documentDirections',
    displayField: 'name',
    valueField: 'id',
    editable: false,
    emptyText: 'აარჩიეთ მიმართულება',
    padding: '5px 0 0 0',
    fieldLabel: 'მიმართულება',
    width: '100%',
    bind: '{doc.direction}'
  }, {
    xtype: 'documentEditorDirectionIn',
    flex: 1,
    bind: {
      visible: '{directionIn}'
    }
  }]
});

Ext.define('Telasi.view.document.EditorDirectionIn', {
  extend: 'Ext.form.FieldSet',
  alias: 'widget.documentEditorDirectionIn',
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
      format: 'd/m/Y',
      width: '100%',
      fieldLabel: 'თარიღი'
    }]
  }], 
});
