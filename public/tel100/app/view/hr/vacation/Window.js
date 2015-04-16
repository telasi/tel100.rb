/*
 * File: app/view/hr/vacation/Window.js
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
    'Ext.form.Label',
    'Ext.form.field.Hidden',
    'Ext.button.Button',
    'Ext.form.field.TextArea'
  ],

  controller: 'hrvacationwindow',
  viewModel: {
    type: 'hrvacationwindow'
  },
  height: 550,
  resizable: false,
  width: 700,
  autoDestroy: false,
  modal: true,

  bind: {
    title: '{i18n.vacation.ui.button}'
  },
  items: [
    {
      xtype: 'form',
      defaults: {
        labelWidth: 200
      },
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
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.period}'
          },
          items: [
            {
              xtype: 'datefield',
              flex: 1,
              margin: '0 10 0 0',
              name: 'from_date',
              allowBlank: false,
              format: 'd/m/Y'
            },
            {
              xtype: 'datefield',
              flex: 1,
              name: 'to_date',
              allowBlank: false,
              format: 'd/m/Y'
            }
          ]
        },
        {
          xtype: 'label',
          padding: '10 0 0 0',
          bind: {
            text: '{i18n.vacation.fields.signees}'
          }
        },
        {
          xtype: 'panel',
          padding: '0 0 10 0',
          header: false,
          bind: {
            title: '{i18n.vacation.fields.signees}'
          }
        },
        {
          xtype: 'fieldcontainer',
          anchor: '100%',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.head_of_group}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              name: 'head_of_group_name',
              editable: false
            },
            {
              xtype: 'hiddenfield',
              flex: 1,
              fieldLabel: 'Label',
              name: 'head_of_group'
            },
            {
              xtype: 'button',
              itemId: 'head_of_group',
              text: '...',
              listeners: {
                click: 'onSelectHeadOfGroupButtonClick'
              }
            }
          ]
        },
        {
          xtype: 'fieldcontainer',
          anchor: '100%',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.head_of_division}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              name: 'head_of_division_name',
              editable: false
            },
            {
              xtype: 'hiddenfield',
              flex: 1,
              fieldLabel: 'Label',
              name: 'head_of_division'
            },
            {
              xtype: 'button',
              itemId: 'head_of_division',
              text: '...',
              listeners: {
                click: 'onSelectHeadOfDivisionButtonClick'
              }
            }
          ]
        },
        {
          xtype: 'fieldcontainer',
          anchor: '100%',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.head_of_department}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              name: 'head_of_department_name',
              editable: false
            },
            {
              xtype: 'hiddenfield',
              flex: 1,
              fieldLabel: 'Label',
              name: 'head_of_department'
            },
            {
              xtype: 'button',
              itemId: 'head_of_department',
              text: '...',
              listeners: {
                click: 'onSelectHeadOfDepartmentClick'
              }
            }
          ]
        },
        {
          xtype: 'fieldcontainer',
          anchor: '100%',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.director}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              name: 'director_name',
              editable: false
            },
            {
              xtype: 'hiddenfield',
              flex: 1,
              fieldLabel: 'Label',
              name: 'director'
            },
            {
              xtype: 'button',
              itemId: 'director',
              text: '...',
              listeners: {
                click: 'onSelectDirectorClick'
              }
            }
          ]
        },
        {
          xtype: 'fieldcontainer',
          anchor: '100%',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.head_of_hr}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              name: 'head_of_hr_name',
              editable: false
            },
            {
              xtype: 'hiddenfield',
              flex: 1,
              fieldLabel: 'Label',
              name: 'head_of_hr'
            },
            {
              xtype: 'button',
              itemId: 'head_of_hr',
              text: '...',
              listeners: {
                click: 'onSelectHeadOfHRClick'
              }
            }
          ]
        },
        {
          xtype: 'label',
          margin: '10 0 0 0'
        },
        {
          xtype: 'panel',
          padding: '0 0 10 0',
          header: false,
          bind: {
            title: '{i18n.vacation.fields.signees}'
          }
        },
        {
          xtype: 'fieldcontainer',
          height: 26,
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          bind: {
            fieldLabel: '{i18n.vacation.fields.substitude}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              id: 'substitude_name',
              name: 'substitude_name',
              editable: false
            },
            {
              xtype: 'hiddenfield',
              flex: 1,
              fieldLabel: 'substitude',
              name: 'substitude'
            },
            {
              xtype: 'button',
              itemId: 'substitude',
              text: '...',
              listeners: {
                click: 'onSelectSubstitude'
              }
            }
          ]
        },
        {
          xtype: 'combobox',
          anchor: '100%',
          name: 'substitude_type',
          readOnly: false,
          editable: false,
          displayField: 'name',
          valueField: 'id',
          bind: {
            fieldLabel: '{i18n.vacation.fields.docview}',
            store: '{substitude_type}',
            selection: '{substitude_explain}'
          }
        },
        {
          xtype: 'textareafield',
          height: 100,
          width: '100%',
          name: 'substitude_type_explanation',
          submitValue: false,
          editable: false,
          bind: {
            value: '{substitude_explain.explain}'
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