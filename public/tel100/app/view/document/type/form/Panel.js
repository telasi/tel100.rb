/*
 * File: app/view/document/type/form/Panel.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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

Ext.define('Tel100.view.document.type.form.Panel', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documenttypeformpanel',

  requires: [
    'Tel100.view.document.type.form.PanelViewModel',
    'Ext.form.field.Number'
  ],

  viewModel: {
    type: 'documenttypeformpanel'
  },
  bodyPadding: 10,

  items: [
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'Name, KA',
      bind: {
        value: '{doctype.name_ka}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'Name, RU',
      bind: {
        value: '{doctype.name_ru}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'Name, EN',
      bind: {
        value: '{doctype.name_en}'
      }
    },
    {
      xtype: 'numberfield',
      anchor: '100%',
      fieldLabel: 'Order By',
      maxValue: 999,
      minValue: 0,
      bind: {
        value: '{doctype.order_by}'
      }
    }
  ],

  loadDoctype: function(doctype) {
    var self = this;
    self.setLoading(true);
    doctype.load({
      success: function() {
        self.setLoading(false);
        self.getViewModel().set('doctype', doctype);
      },
      failure: function() {
      }
    });
  }

});