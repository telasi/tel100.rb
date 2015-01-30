/*
 * File: app/view/hr/vacation/Window.js
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

Ext.define('Tel100.view.hr.vacation.Window', {
  extend: 'Ext.window.Window',
  alias: 'widget.hrvacationwindow',

  requires: [
    'Tel100.view.hr.vacation.WindowViewModel',
    'Tel100.view.hr.vacation.WindowViewController',
    'Ext.form.Panel',
    'Ext.form.field.ComboBox',
    'Ext.form.FieldContainer',
    'Ext.form.field.Date',
    'Ext.button.Button'
  ],

  controller: 'hrvacationwindow',
  viewModel: {
    type: 'hrvacationwindow'
  },
  height: 190,
  resizable: false,
  width: 480,
  autoDestroy: false,
  modal: true,

  bind: {
    title: '{i18n.vacation.ui.button}'
  },
  items: [
    {
      xtype: 'form',
      bodyPadding: 10,
      header: false,
      title: 'My Form',
      jsonSubmit: true,
      url: '/api/vacation/create',
      items: [
        {
          xtype: 'combobox',
          anchor: '100%',
          name: 'vacation_type',
          allowBlank: false,
          editable: false,
          displayField: 'name',
          valueField: 'id',
          bind: {
            fieldLabel: '{i18n.vacation.fields.type}',
            store: '{types}'
          }
        },
        {
          xtype: 'fieldcontainer',
          height: 26,
          fieldLabel: '',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          items: [
            {
              xtype: 'datefield',
              flex: 1,
              margin: '0 10 0 0',
              name: 'from_date',
              allowBlank: false,
              bind: {
                fieldLabel: '{i18n.vacation.fields.from}'
              }
            },
            {
              xtype: 'datefield',
              flex: 1,
              name: 'to_date',
              allowBlank: false,
              bind: {
                fieldLabel: '{i18n.vacation.fields.to}'
              }
            }
          ]
        },
        {
          xtype: 'combobox',
          anchor: '100%',
          name: 'substitude',
          bind: {
            fieldLabel: '{i18n.vacation.fields.substitude}'
          },
          listeners: {
            expand: 'onSelectSubstitute'
          }
        },
        {
          xtype: 'fieldcontainer',
          height: 32,
          margin: '0 0 10 0',
          fieldLabel: '',
          layout: {
            type: 'hbox',
            align: 'stretch',
            pack: 'end',
            padding: 5
          },
          items: [
            {
              xtype: 'button',
              flex: 1,
              margin: '0 10 0 0',
              bind: {
                text: '{i18n.vacation.ui.save}'
              },
              listeners: {
                click: 'onOKButtonClick'
              }
            },
            {
              xtype: 'button',
              flex: 1,
              bind: {
                text: '{i18n.vacation.ui.cancel}'
              },
              listeners: {
                click: 'onCancelButtonClick'
              }
            }
          ]
        }
      ]
    }
  ]

});