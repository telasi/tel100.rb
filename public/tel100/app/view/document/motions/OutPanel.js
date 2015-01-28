/*
 * File: app/view/document/motions/OutPanel.js
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

Ext.define('Tel100.view.document.motions.OutPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsoutpanel',

  requires: [
    'Tel100.view.document.motions.OutPanelViewModel',
    'Tel100.view.document.motions.OutPanelViewController',
    'Tel100.view.document.motions.OutGrid',
    'Ext.grid.Panel',
    'Ext.toolbar.Toolbar',
    'Ext.button.Button',
    'Ext.toolbar.Fill'
  ],

  controller: 'documentmotionsoutpanel',
  viewModel: {
    type: 'documentmotionsoutpanel'
  },
  layout: 'border',

  bind: {
    title: '{i18n.document.motion.outMotions}'
  },
  items: [
    {
      xtype: 'documentmotionsoutgrid',
      data: {
        outmode: true,
        basemotion: false
      },
      flex: 2,
      region: 'center',
      bind: {
        selection: '{selection}'
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'button',
          handler: function(button, e) {
            var panel = this.up('documentmotionsoutpanel');
            panel.refresh();
          },
          bind: {
            text: '{i18n.ui.refresh}'
          }
        },
        {
          xtype: 'button',
          handler: function(button, e) {
            var receiverDialog = Ext.create('Tel100.view.party.Selector', {
              title: i18n.document.motion.selectReceiver
            });
            receiverDialog.show();
            receiverDialog.on('selectioncomplete', function(receivers) {
              if (receivers.length > 0) {
                for (var i = 0; i < receivers.length; i++) {
                  var panel = this.up('documentmotionsoutpanel');
                  var controller = panel.getController();
                  controller.addReceiver(receivers[i]);
                }
              }
            }.bind(this));
          },
          cls: 'success-button',
          bind: {
            text: '{i18n.ui.add}'
          }
        },
        {
          xtype: 'tbfill'
        },
        {
          xtype: 'button',
          handler: function(button, e) {
            var panel = this.up('documentmotionsoutpanel');
            var vm = panel.getViewModel();
            var selection = vm.get('selection');
            if (selection) {
              var msg = i18n.ui.deleteConfirm;
              var title = i18n.ui.confirmTitle;
              var grid = panel.down('documentmotionsoutgrid');
              var successFunction = function() {
                grid.getStore().remove(selection);
              };
              Ext.Msg.confirm(title, msg, function(resp) {
                if (resp === 'yes') {
                  helpers.api.document.motion.deleteDraft(selection.id, {
                    success: successFunction
                  });
                }
              }.bind(this));
            }
          },
          cls: 'danger-button',
          bind: {
            disabled: '{deleteDraftButtonDisabled}',
            text: '{i18n.ui.delete}'
          }
        }
      ]
    }
  ],
  listeners: {
    beforerender: 'onBeforeRender',
    motionchange: 'onPanelMotionChange'
  },

  refresh: function() {
    var grid = this.down('documentmotionsoutgrid');
    grid.refresh();
  }

});