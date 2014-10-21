Ext.define('Telasi.view.document.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditor',
  border: false,
  requires: [
    'Telasi.model.document.Type',
    'Telasi.store.document.Type',
    'Telasi.store.document.Direction',
    'Telasi.store.Language',
  ],
  // controller: 'documentEditor',

  bind: {
    title: '<i class="fa fa-bookmark-o"></i> ახალი {typeName}'
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
      region: 'center',
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
  border: false,
  alias: 'widget.documentEditorNorth',
  items: [{
    xtype: 'panel',
    border: false,
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: '0 5px 5px 5px'
    },
    items: [],
  }, {
    xtype: 'panel',
    border: false,
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: '0 5px 5px 5px'
    },
    items: [ ],
  }, {
    xtype: 'panel',
    border: false,
    layout: {
      type: 'hbox',
      align: 'stretch',
      padding: '0 5px 5px 5px'
    },
    items: [{
      xtype: 'textfield',
      emptyText: 'ჩაწერეთ მოკლე შინაარსი',
      flex: 1
    }]
  }],
});

Ext.define('Telasi.view.document.EditorCenter', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentEditorCenter',
  layout: 'fit',
  border: false,
  items: [{
    xtype: 'htmleditor',
    padding: 5,
    emptyText: 'ჩაწერეთ დაწვრილებითი შინაარსი'
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
    title: '<i class="fa fa-bookmark-o"></i> ძირითადი',
    autoScroll: true
  }, {
    xtype: 'panel',
    border: false,
    title: '<i class="fa fa-users"></i> ადრესატები',
    html: 'TODO: ადრესატები',
  }]
});

Ext.define('Telasi.view.document.EditorMain', {
  extend: 'Ext.form.Panel',
  border: false,
  alias: 'widget.documentEditorMain',
  items: [{
    xtype: 'combo',
    store: 'documentTypes',
    displayField: 'name',
    valueField: 'id',
    editable: false,
    emptyText: 'აარჩიეთ ტიპი',
    fieldLabel: 'ტიპი',
    width: '100%',
    bind: '{doc.typeId}'
  }, {
    xtype: 'combo',
    displayField: 'name',
    valueField: 'id',
    editable: false,
    emptyText: 'აარჩიეთ ენა',
    store: 'languages',
    width: '100%',
    bind: {
      value: '{doc.language}',
      fieldLabel: '{typeNameGenitive} ენა',
    },
  }, {
    xtype: 'textfield',
    emptyText: 'ჩაწერეთ დოკუმენტის #',
    padding: 0,
    width: '100%',
    fieldLabel: 'ნომერი'
  }, {
    xtype: 'numberfield',
    fieldLabel: 'გვერდები',
    width: '100%',
    bind: '{doc.pageCount}',
    minValue: 0,
    allowDecimals: false,
  }, {
    xtype: 'numberfield',
    fieldLabel: 'დანართები',
    width: '100%',
    bind: '{doc.additionsCount}',
    minValue: 0,
    allowDecimals: false,
  }, {
    xtype: 'datefield',
    fieldLabel: 'ვადა',
    width: '100%',
    bind: '{doc.dueDate}',
    format: 'd/m/Y',
    emptyText: 'შესრულების ვადა'
  }, {
    xtype: 'datefield',
    fieldLabel: 'საკონტროლო',
    width: '100%',
    bind: '{doc.alertDate}',
    format: 'd/m/Y',
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
