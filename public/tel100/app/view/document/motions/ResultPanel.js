/*
 * File: app/view/document/motions/ResultPanel.js
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

Ext.define('Tel100.view.document.motions.ResultPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsresultpanel',

  requires: [
    'Tel100.view.document.motions.ResultPanelViewModel',
    'Tel100.view.document.motions.ResultPanelViewController',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Checkbox',
    'Ext.form.field.TextArea',
    'Ext.button.Button'
  ],

  controller: 'documentmotionsresultpanel',
  viewModel: {
    type: 'documentmotionsresultpanel'
  },
  autoScroll: true,

  layout: {
    type: 'vbox',
    align: 'stretch',
    padding: 5
  },
  bind: {
    title: '{i18n.document.motion.resultPaneTitle}'
  },
  items: [
    {
      xtype: 'combobox',
      itemId: 'in-motions',
      editable: false,
      autoSelect: false,
      valueField: 'id',
      bind: {
        fieldLabel: '{i18n.document.comment.motion}',
        value: '{motionId}',
        store: '{motions}'
      }
    },
    {
      xtype: 'checkboxfield',
      flex: 0,
      itemId: 'is-complete',
      bind: {
        fieldLabel: '{i18n.document.comment.complete}',
        value: '{isResult}'
      }
    },
    {
      xtype: 'combobox',
      tpl: '<tpl for="."><div class="x-boundlist-item">{html_name}</div></tpl>',
      flex: 0,
      itemId: 'result-types',
      editable: false,
      autoSelect: false,
      displayField: 'name',
      valueField: 'id',
      bind: {
        hidden: '{hideComplete}',
        fieldLabel: '{i18n.document.comment.result}',
        value: '{categoryId}',
        store: '{responseTypes}'
      }
    },
    {
      xtype: 'textareafield',
      flex: 0,
      itemId: 'comment-text',
      bind: {
        fieldLabel: '{i18n.document.comment.text}',
        value: '{text}'
      }
    },
    {
      xtype: 'button',
      margin: 8,
      width: 728,
      bind: {
        text: '{saveLabel}'
      },
      listeners: {
        click: 'onSaveClick'
      }
    }
  ],

  resetForm: function() {
    var motionsCombo = this.down('#in-motions');
    var typeCombo = this.down('#result-types');
    var completeCheck = this.down('#is-complete');
    var textField = this.down('#comment-text');
    motionsCombo.select(motionsCombo.getStore().getAt(0));
    typeCombo.select(typeCombo.getStore().getAt(0));
    textField.setValue('');
    completeCheck.setValue(false);

  }

});