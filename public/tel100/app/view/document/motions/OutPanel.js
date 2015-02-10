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
    'Ext.toolbar.Toolbar',
    'Ext.button.Button',
    'Ext.toolbar.Fill',
    'Ext.grid.Panel'
  ],

  controller: 'documentmotionsoutpanel',
  viewModel: {
    type: 'documentmotionsoutpanel'
  },
  layout: 'border',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.outMotions}'
  },
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
            text: '{i18n.ui.refresh}',
            tooltip: '{i18n.ui.refresh}'
          }
        },
        {
          xtype: 'button',
          handler: function(button, e) {
            var controller = this.up('documentmotionsoutpanel').getController();
            var dialog = controller.receiverDialog;
            dialog.show();
          },
          cls: 'success-button',
          bind: {
            text: '{i18n.ui.add_short}',
            tooltip: '{i18n.ui.add}'
          }
        },
        {
          xtype: 'button',
          bind: {
            disabled: '{sendButtonDisabled}',
            hidden: '{sendButtonDisabled}',
            text: '{i18n.document.motion.sendMotions}'
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
              var msg = i18n.ui.destroyConfirm;
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
            text: '{i18n.ui.destroy_short}',
            tooltip: '{i18n.ui.destroy}'
          }
        }
      ]
    }
  ],
  items: [
    {
      xtype: 'documentmotionsoutgrid',
      data: {
        outmode: true,
        basemotion: false
      },
      region: 'center',
      bind: {
        selection: '{selection}'
      }
    }
  ],
  listeners: {
    beforerender: {
      fn: 'onBeforeRender',
      scope: 'controller'
    },
    motionchange: {
      fn: 'onPanelMotionChange',
      scope: 'controller'
    },
    beforedestroy: {
      fn: 'onPanelBeforeDestroy',
      scope: 'controller'
    },
    draftmotionchanged: 'onDraftmotionChanged'
  },

  onDraftmotionChanged: function(hasDraftMotions) {
    var vm = this.getViewModel();
    vm.set('hasDraftMotions', hasDraftMotions);
  },

  refresh: function() {
    this.getGrid().refresh();
  },

  getGrid: function() {
    return this.down('documentmotionsoutgrid');
  },

  initComponent: function() {
    this.callParent();
    var gridVM = this.getGrid().getViewModel();
    var self = this;
    gridVM.bind('{hasDraftMotion}', function() {
      var draftMotion = gridVM.get('hasDraftMotion');
      self.fireEvent('draftmotionchanged', draftMotion);
    });
  },

  setParentId: function(id) {
    var grid = this.down('documentmotionsoutgrid');
    var vm = grid.getViewModel();
    vm.set('parentId', id);
  },

  getParentId: function() {
    var grid = this.down('documentmotionsoutgrid');
    var vm = grid.getViewModel();
    return vm.get('parentId');
  }

});