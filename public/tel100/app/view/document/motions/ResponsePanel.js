/*
 * File: app/view/document/motions/ResponsePanel.js
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

Ext.define('Tel100.view.document.motions.ResponsePanel', {
  extend: 'Ext.container.Container',
  alias: 'widget.documentmotionsresponsepanel',

  requires: [
    'Tel100.view.document.motions.ResponsePanelViewModel',
    'Tel100.view.document.motions.InCombo',
    'Ext.form.field.ComboBox',
    'Ext.form.FieldContainer',
    'Ext.button.Segmented',
    'Ext.button.Button',
    'Ext.form.field.TextArea'
  ],

  viewModel: {
    type: 'documentmotionsresponsepanel'
  },
  height: 250,
  padding: 8,
  width: 400,
  defaultListenerScope: true,

  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'documentmotionsincombo',
      bind: {
        fieldLabel: '{i18n.document.comment.motion}',
        selection: '{parentMotionId}'
      }
    },
    {
      xtype: 'fieldcontainer',
      flex: 0,
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      bind: {
        fieldLabel: '{i18n.document.comment.action}'
      },
      items: [
        {
          xtype: 'segmentedbutton',
          flex: 0,
          items: [
            {
              itemId: 'comment',
              allowDepress: false,
              bind: {
                text: '{i18n.document.comment.actions.comment}'
              }
            },
            {
              itemId: 'confirm',
              bind: {
                text: '{i18n.document.comment.actions.confirm}'
              }
            },
            {
              itemId: 'cancel',
              bind: {
                text: '{i18n.document.comment.actions.cancel}'
              }
            }
          ],
          listeners: {
            toggle: 'onTypeToggle'
          }
        }
      ]
    },
    {
      xtype: 'textareafield',
      flex: 1,
      bind: {
        fieldLabel: '{i18n.document.comment.text}',
        value: '{comment.text}'
      }
    }
  ],

  onTypeToggle: function(segmentedbutton, button, isPressed, eOpts) {
    if (isPressed) {
      var vm = this.getViewModel();
      var comment = vm.get('comment');
      comment.set('type', button.itemId);
    }
  },

  initComponent: function() {
    this.callParent();
    var vm = this.getViewModel();
    vm.bind('{comment}', function(comment) {
      var type = comment.get('type');
      var view = this.getView();
      view.down('#' + type).toggle(true);
    });
  }

});