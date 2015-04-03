/*
 * File: app/view/document/motions/Panel.js
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

Ext.define('Tel100.view.document.motions.Panel', {
  extend: 'Ext.container.Container',
  alias: 'widget.documentmotionspanel',

  requires: [
    'Tel100.view.document.motions.PanelViewModel',
    'Ext.tab.Panel',
    'Ext.tab.Tab',
    'Ext.form.field.TextArea',
    'Ext.form.field.Date',
    'Ext.form.field.Display',
    'Ext.form.Label'
  ],

  viewModel: {
    type: 'documentmotionspanel'
  },
  layout: 'fit',

  items: [
    {
      xtype: 'tabpanel',
      activeTab: 0,
      items: [
        {
          xtype: 'panel',
          autoScroll: true,
          bodyPadding: 5,
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          bind: {
            title: '<i class="fa fa-send"></i> {i18n.document.motion.general}'
          },
          items: [
            {
              xtype: 'textfield',
              flex: 0,
              readOnly: true,
              bind: {
                fieldLabel: '{i18n.document.motion.sender}',
                value: '{motion.senderName}'
              }
            },
            {
              xtype: 'textfield',
              flex: 0,
              readOnly: true,
              bind: {
                fieldLabel: '{i18n.document.motion.receiver}',
                value: '{motion.receiverName}'
              }
            },
            {
              xtype: 'textfield',
              editable: false,
              bind: {
                fieldLabel: '{i18n.document.motion.send_type}',
                value: '{motion.send_type_name}'
              }
            },
            {
              xtype: 'textareafield',
              readOnly: true,
              bind: {
                fieldLabel: '{i18n.document.motion.motion_text}',
                value: '{motion.motion_text}'
              }
            },
            {
              xtype: 'datefield',
              readOnly: true,
              format: 'd/m/Y',
              bind: {
                fieldLabel: '{i18n.document.motion.due_date}',
                value: '{motion.due_date}'
              }
            },
            {
              xtype: 'displayfield',
              renderer: function(value, displayField) {
                var view = displayField.up('documentmotionspanel');
                var vm = view.getViewModel();
                var motion = vm.get('motion');
                var responseType = motion && motion.get('resp_type_name');
                if (responseType) {
                  return value + ' - ' + responseType;
                } else {
                  return value;
                }
              },
              bind: {
                fieldLabel: '{i18n.document.motion.status}',
                value: '{motion.statusFull}'
              }
            },
            {
              xtype: 'textareafield',
              readOnly: true,
              bind: {
                fieldLabel: '{i18n.document.motion.response_text}',
                value: '{motion.response_text}'
              }
            }
          ]
        },
        {
          xtype: 'panel',
          autoScroll: true,
          defaults: {
            labelWidth: 150,
            // labelAlign: 'right'
          },
          bodyPadding: 5,
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          bind: {
            title: '<i class="fa fa-calendar"></i> {i18n.document.motion.times}'
          },
          items: [
            {
              xtype: 'datefield',
              readOnly: true,
              format: 'd/m/Y H:i:s',
              bind: {
                fieldLabel: '<i class="fa fa-circle-o"></i> {i18n.document.motion.created_at}',
                value: '{motion.created_at}'
              }
            },
            {
              xtype: 'datefield',
              readOnly: true,
              format: 'd/m/Y H:i:s',
              bind: {
                fieldLabel: '<i class="fa fa-edit"></i> {i18n.document.motion.updated_at}',
                value: '{motion.updated_at}'
              }
            },
            {
              xtype: 'label',
              height: 25
            },
            {
              xtype: 'datefield',
              readOnly: true,
              format: 'd/m/Y H:i:s',
              bind: {
                fieldLabel: '<i class="fa fa-send"></i> {i18n.document.motion.sent_at}',
                value: '{motion.sent_at}'
              }
            },
            {
              xtype: 'datefield',
              readOnly: true,
              format: 'd/m/Y H:i:s',
              bind: {
                fieldLabel: '<i class="fa fa-clock-o"></i> {i18n.document.motion.received_at}',
                value: '{motion.received_at}'
              }
            },
            {
              xtype: 'datefield',
              readOnly: true,
              format: 'd/m/Y H:i:s',
              bind: {
                fieldLabel: '<i class="fa fa-check"></i> {i18n.document.motion.completed_at}',
                value: '{motion.completed_at}'
              }
            }
          ]
        }
      ]
    }
  ],

  setMotion: function(motion) {
    var view = this;
    Ext.create('Tel100.model.document.Motion', { id : motion.id }).load({
      success: function(record, operation) {
        view.getViewModel().set('motion', record);
      },
      failure: function(record, operation) {
        console.log('cannot load motion');
      }
    });
  },

  getMotion: function() {
    return this.getViewModel().get('motion');
  }

});