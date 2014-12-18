Ext.define('Tel100.view.document.type.form.Panel', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documenttypeformpanel',

  requires: [
    'Tel100.view.document.type.form.PanelViewModel',
    'Tel100.view.document.type.form.PanelViewController',
    'Ext.form.field.Number',
    'Ext.panel.Tool'
  ],

  config: {
    buttons: [{
      bind: {
        text: '<i class="fa fa-save"></i> {i18n.actions.save}',
        handler: 'onSave'
      }
    }, '->', {
      bind: {
        text: '<i class="fa fa-trash"></i> {i18n.actions.delete}',
        handler: 'onDelete'
      }
    }]
  },

  controller: 'documenttypeformpanel',
  viewModel: { type: 'documenttypeformpanel' },
  bodyPadding: 10,

  bind: {
    title: '{title}'
  },
  items: [
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'დასახელება',
      bind: {
        value: '{doctype.name_ka}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'Наименование',
      bind: {
        value: '{doctype.name_ru}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'Name',
      bind: {
        value: '{doctype.name_en}'
      }
    },
    {
      xtype: 'numberfield',
      anchor: '100%',
      maxValue: 999,
      minValue: 0,
      bind: {
        fieldLabel: '{i18n.document.type.order_by}',
        value: '{doctype.order_by}'
      }
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'plus',
      bind: {
        tooltip: '{i18n.actions.addnew}'
      },
      listeners: {
        click: 'onNew'
      }
    }
  ],

  loadDoctype: function(doctype) {
    this.getController().loadDoctype(doctype);
  }
});
