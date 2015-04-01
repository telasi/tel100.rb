/*
 * File: app/view/document/editor/General.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.document.editor.General', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documenteditorgeneral',

  requires: [
    'Tel100.view.document.editor.GeneralViewModel',
    'Tel100.view.document.editor.GeneralViewController',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.form.field.Number',
    'Ext.form.FieldSet'
  ],

  controller: 'documenteditorgeneral',
  viewModel: {
    type: 'documenteditorgeneral'
  },
  autoScroll: true,
  bodyPadding: 5,

  items: [
    {
      xtype: 'textfield',
      anchor: '100%',
      editable: false,
      bind: {
        fieldLabel: '{i18n.document.base.sender}',
        value: '{document.sender_name}'
      }
    },
    {
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
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      bind: {
        fieldLabel: '{i18n.document.base.docnumber}',
        value: '{document.docnumber}',
        readOnly: '{readonly}'
      }
    },
    {
      xtype: 'datefield',
      format: 'd/m/Y',
      bind: {
        fieldLabel: '{i18n.document.base.docdate}',
        value: '{document.docdate}',
        readOnly: '{readonly}'
      }
    },
    {
      xtype: 'datefield',
      format: 'd/m/Y',
      bind: {
        fieldLabel: '{i18n.document.base.due_date}',
        value: '{document.due_date}',
        readOnly: '{readonly}'
      }
    },
    {
      xtype: 'numberfield',
      anchor: '100%',
      minValue: 0,
      bind: {
        fieldLabel: '{i18n.document.base.page_count}',
        value: '{document.page_count}',
        readOnly: '{readonly}'
      }
    },
    {
      xtype: 'numberfield',
      anchor: '100%',
      minValue: 0,
      bind: {
        fieldLabel: '{i18n.document.base.additions_count}',
        value: '{document.additions_count}',
        readOnly: '{readonly}'
      }
    },
    {
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
    },
    {
      xtype: 'fieldset',
      bind: {
        hidden: '{!isIncoming}',
        title: '{i18n.document.base.in_fields}'
      },
      items: [
        {
          xtype: 'textfield',
          anchor: '100%',
          bind: {
            fieldLabel: '{i18n.document.base.original_number}',
            value: '{document.original_number}',
            readOnly: '{readonly}'
          }
        },
        {
          xtype: 'datefield',
          anchor: '100%',
          format: 'd/m/Y',
          bind: {
            fieldLabel: '{i18n.document.base.original_date}',
            value: '{document.original_date}',
            readOnly: '{readonly}'
          }
        }
      ]
    }
  ],

  getReadonly: function() {
    return this.getViewModel().get('readonly');
  },

  setReadonly: function(ro) {
    return this.getViewModel().set('readonly', ro);
  }

});