/*
 * File: app/view/document/comment/Sign.js
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

Ext.define('Tel100.view.document.comment.Sign', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentcommentsign',

  requires: [
    'Tel100.view.document.comment.SignViewModel',
    'Ext.button.Segmented',
    'Ext.button.Button',
    'Ext.form.field.TextArea',
    'Ext.toolbar.Toolbar',
    'Ext.toolbar.Spacer'
  ],

  viewModel: {
    type: 'documentcommentsign'
  },
  height: 250,
  width: 400,

  layout: {
    type: 'vbox',
    align: 'stretch',
    padding: 5
  },
  bind: {
    title: '{i18n.document.comment.actions.sign_document}'
  },
  items: [
    {
      xtype: 'segmentedbutton',
      items: [
        {
          enableToggle: true,
          pressed: true,
          bind: {
            text: '{i18n.document.comment.actions.sign_ok}'
          }
        },
        {
          bind: {
            text: '{i18n.document.comment.actions.sign_cancel}'
          }
        }
      ]
    },
    {
      xtype: 'textareafield',
      flex: 1,
      labelAlign: 'top',
      bind: {
        fieldLabel: '{i18n.document.comment.text}'
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      flex: 1,
      dock: 'bottom',
      items: [
        {
          xtype: 'button',
          bind: {
            text: '{i18n.ui.save}'
          }
        },
        {
          xtype: 'tbspacer',
          flex: 1
        },
        {
          xtype: 'button',
          bind: {
            text: '{i18n.ui.cancel}'
          }
        }
      ]
    }
  ]

});