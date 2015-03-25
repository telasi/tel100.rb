/*
 * File: app/view/document/folder/Search.js
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

Ext.define('Tel100.view.document.folder.Search', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentfoldersearch',

  requires: [
    'Tel100.view.document.folder.SearchViewModel',
    'Tel100.view.document.folder.SearchViewController',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Spinner',
    'Ext.form.FieldSet',
    'Ext.form.field.Date',
    'Ext.button.Button'
  ],

  controller: 'documentfoldersearch',
  viewModel: {
    type: 'documentfoldersearch'
  },
  autoScroll: true,
  bodyPadding: 10,
  url: '/api/documents/base/search',

  items: [
    {
      xtype: 'combobox',
      anchor: '100%',
      name: 'folder',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      bind: {
        fieldLabel: '{i18n.document.search.folder}',
        store: '{standardFolders}'
      }
    },
    {
      xtype: 'combobox',
      anchor: '100%',
      name: 'type',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      bind: {
        fieldLabel: '{i18n.document.search.type}',
        store: '{types}'
      }
    },
    {
      xtype: 'combobox',
      anchor: '100%',
      name: 'direction',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      bind: {
        fieldLabel: '{i18n.document.search.direction}',
        store: '{direction}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      name: 'subject',
      bind: {
        fieldLabel: '{i18n.document.search.subject}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      name: 'original_number',
      bind: {
        fieldLabel: '{i18n.document.search.original_number}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      name: 'docnumber',
      bind: {
        fieldLabel: '{i18n.document.search.docnumber}'
      }
    },
    {
      xtype: 'textfield',
      anchor: '100%',
      name: 'sender',
      bind: {
        fieldLabel: '{i18n.document.search.sender}'
      }
    },
    {
      xtype: 'spinnerfield',
      anchor: '100%',
      bind: {
        fieldLabel: '{i18n.document.search.page_count}'
      }
    },
    {
      xtype: 'fieldset',
      layout: 'form',
      bind: {
        title: '{i18n.document.search.docdate}'
      },
      items: [
        {
          xtype: 'datefield',
          name: 'docdate_from',
          format: 'd/m/Y',
          bind: {
            fieldLabel: '{i18n.document.search.from}'
          }
        },
        {
          xtype: 'datefield',
          name: 'docdate_to',
          format: 'd/m/Y',
          bind: {
            fieldLabel: '{i18n.document.search.to}'
          }
        }
      ]
    },
    {
      xtype: 'button',
      width: '100%',
      bind: {
        text: '{i18n.document.search.buttons.search}'
      },
      listeners: {
        click: 'onSearchButtonClick'
      }
    },
    {
      xtype: 'button',
      width: '100%',
      bind: {
        text: '{i18n.document.search.buttons.reset}'
      },
      listeners: {
        click: 'onResetButtonClick'
      }
    }
  ]

});