Ext.define('Tel100.view.document.editor.General', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documenteditorgeneral',

  controller: 'documenteditorgeneral',
  viewModel: {
    type: 'documenteditorgeneral'
  },
  autoScroll: true,
  bodyPadding: 5,

  items: [{
    xtype: 'textfield',
    anchor: '100%',
    editable: false,
    bind: {
      fieldLabel: '{i18n.document.base.sender}',
      value: '{document.sender_name}'
    }
  }, {
    xtype: 'combobox',
    anchor: '100%',
    editable: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.base.type}',
      value: '{document.type_id}',
      readOnly: '{readonly}',
      store: '{types}'
    },
    listeners: {
      change: 'onTypeIdChange'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    bind: {
      fieldLabel: '{i18n.document.base.docnumber}',
      value: '{document.docnumber}',
      // readOnly: '{readonly}'
      readOnly: true
    }
  }, {
    xtype: 'datefield',
    format: 'd/m/Y',
    bind: {
      fieldLabel: '{i18n.document.base.docdate}',
      value: '{document.docdate}',
      readOnly: '{readonlyForDate}',
      // readOnly: true
    }
  }, {
    xtype: 'datefield',
    format: 'd/m/Y',
    bind: {
      fieldLabel: '{i18n.document.base.due_date}',
      value: '{document.due_date}',
      readOnly: '{readonly}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    bind: {
      fieldLabel: '{typeName} №',
      value: '{document.docnumber2}',
      readOnly: '{readonly}',
      hidden: '{readonlyForDate}'
    }
  }, {
    xtype: 'numberfield',
    anchor: '100%',
    minValue: 0,
    bind: {
      fieldLabel: '{i18n.document.base.page_count}',
      value: '{document.page_count}',
      readOnly: '{readonly}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    minValue: 0,
    bind: {
      fieldLabel: '{i18n.document.base.additions}',
      value: '{document.additions}',
      readOnly: '{readonly}'
    }
  }, {
    xtype: 'combobox',
    anchor: '100%',
    editable: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.base.direction}',
      value: '{document.direction}',
      readOnly: '{readonly}',
      store: '{directions}'
    }
  }, {
    xtype: 'fieldset',
    bind: {
      hidden: '{!isIncoming}',
      title: '{i18n.document.base.in_fields}'
    },
    items: [{
      xtype: 'textfield',
      anchor: '100%',
      bind: {
        fieldLabel: '{i18n.document.base.original_number}',
        value: '{document.original_number}',
        readOnly: '{readonly}'
      }
    }, {
      xtype: 'datefield',
      anchor: '100%',
      format: 'd/m/Y',
      bind: {
        fieldLabel: '{i18n.document.base.original_date}',
        value: '{document.original_date}',
        readOnly: '{readonly}'
      }
    }]
  }],

  getReadonly: function() {
    return this.getViewModel().get('readonly');
  },

  setReadonly: function(ro) {
    return this.getViewModel().set('readonly', ro);
  }
});

// GeneralViewController

Ext.define('Tel100.view.document.editor.GeneralViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditorgeneral',

  onTypeIdChange: function(field, newValue, oldValue, eOpts) {
    var vm = this.getViewModel();
    var doc = vm.get('document');
    var type = field.getSelectedRecord();
    vm.set('typeName', type && type.get('name'));
    vm.set('specialType', type && type.get('is_special'));
    if (doc.dirty) {
      doc.set('type', type);
    }
  }
});

// GeneralViewModel

Ext.define('Tel100.view.document.editor.GeneralViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditorgeneral',

  data: {
    readonly: false,
    specialType: false,
    typeName: null
  },

  stores: {
    types: {
      autoLoad: true,
      model: 'Tel100.model.document.Type'
    },

    directions: {
      autoLoad: true,
      model: 'Tel100.model.document.Direction',
      proxy: {
        type: 'memory',
        data: [
          { id: 'inner' },
          { id: 'out' },
          { id: 'in' }
        ]
      }
    }
  },

  formulas: {
    isIncoming: function(get) {
      return get('document.direction') === 'in';
    },

    readonlyForDate: function(get) {
      if (get('readonly')) { return true; }
      if (get('specialType')) { return false; }
      return true;
    }
  }
});
