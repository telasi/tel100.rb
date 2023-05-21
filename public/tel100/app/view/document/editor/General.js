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
      fieldLabel: '{i18n.document.base.direction}',
      value: '{document.direction}',
      readOnly: '{readonly}',
      store: '{directions}'
    },
    listeners: {
      change: 'onDirectionChange'
    }
  }, {
    xtype: 'combobox',
    anchor: '100%',
    editable: false,
    displayField: 'name',
    valueField: 'id',
    itemId: 'typeCombo',
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
    xtype: 'fieldset',
    bind: {
      hidden: '{!originalNumberShown}',
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
  }, {
    xtype: 'fieldset',
    bind: {
      hidden: '{!agreementQuestionShown}',
      title: '{i18n.document.base.agreement_fields}'
    },
    items: [
      {   xtype: 'label',
          padding: '10 0 0 0',
          style: {
            fontWeight: 'bold'
          },
          bind: {
            text: '{i18n.document.base.agreement.question}'
          }
      },
      {
        xtype: 'radiogroup',
        layout: {
          type: 'hbox',
          align: 'stretch',
        },
        bind: {
          value: '{document.agreement_confidential}',
        },
      items: [
        {
          xtype: 'radiofield',
          reference: 'confidential_yes',
          name: 'confidential',
          inputValue: '1',
          bind: {
            readOnly: '{readonly}'
          }
        }, 
        {
          xtype: 'radiofield',
          reference: 'confidential_no',
          name: 'confidential',
          inputValue: '0',
          bind: {
            readOnly: '{readonly}'
          }
        }
      ],
      listeners: {
        afterrender: function() {
          if(this.up('panel').getViewModel().get('document.agreement_confidential') === 1){
            this.items.first().setValue(true)
          } else {
            this.items.last().setValue(true)
          }
        }
      }
    },

    ]
  }],

  initComponent: function(){
    this.callParent();
    var references = this.getReferences();
    references.confidential_yes.setBoxLabel(i18n.document.base.agreement.confidential_yes)
    references.confidential_no.setBoxLabel(i18n.document.base.agreement.confidential_no)
  },

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

  onGnercSubtypeChange: function(subtype){
    combo.fireEvent('change', combo, null, null, { subtype_id: subtype_id });
  },

  onTypeIdChange: function(field, newValue, oldValue, eOpts) {
    var vm = this.getViewModel();
    var doc = vm.get('document');
    var type = field.getSelectedRecord();
    vm.set('typeName', type && type.get('name'));
    vm.set('specialType', type && type.get('is_special'));
    vm.set('isGnerc', type && type.get('is_gnerc'));
    if (!vm.get('readonly') && type && type.get('is_gnerc') && !doc.get('is_reply')){
      subtype = null;
      if(eOpts && eOpts.subtype_id){ subtype = eOpts.subtype_id }
      helpers.api.utils.getDeadline(type.id, subtype, {
        success: function(result) {
          if(result.deadline) {
            doc.set('due_date', new Date(result.deadline));
          } else {
            doc.set('due_date', null)
          }
        }.bind(this),
        failure: function() {
          console.log('failed to get time');
        }
      });
    }
    if (doc.dirty) {
      doc.set('type', type);
    }
  },

  onDirectionChange: function(field, newValue, oldValue, eOpts) {
    var vm = this.getViewModel();
    var store = vm.getStore('types');
    store.proxy.extraParams.direction = newValue;
    store.load(function(records, operation, success) {
      if(success){
        var doc = vm.get('document');
        var type_id = doc.get('type_id');
        doc.set('type_id', null);
        for(var i=0; i < records.length; i++){
          if(records[i].id == type_id){
            doc.set('type_id', records[i].id);
          }
        }
      }
      
    });
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

    originalNumberShown: function(get) {
      return ( get('document.direction') === 'in' || get('document.type_id') === 4 || get('document.type_id') === 19 );
    },

    agreementQuestionShown: function(get){
      return get('document.type_id') === 12;
    },

    readonlyForDate: function(get) {
      if (get('readonly')) { return true; }
      if (get('specialType')) { return false; }
      return true;
    },

    agreementConfidential: function(get) {
      return get('document.agreement_confidential');
    }
  }
});
