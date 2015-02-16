/*
 * File: app/view/document/motions/InPanel.js
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

Ext.define('Tel100.view.document.motions.InPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsinpanel',

  requires: [
    'Tel100.view.document.motions.InPanelViewModel',
    'Tel100.view.document.motions.InGrid',
    'Ext.toolbar.Toolbar',
    'Ext.button.Button',
    'Ext.grid.Panel'
  ],

  viewModel: {
    type: 'documentmotionsinpanel'
  },
  layout: 'fit',

  bind: {
    title: '{i18n.document.motion.inMotions}'
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'button',
          handler: function(button, e) {
            var panel = this.up('documentmotionsinpanel');
            var grid = panel.down('documentmotionsingrid');
            grid.refresh();
          },
          bind: {
            text: '{i18n.ui.refresh}'
          }
        }
      ]
    }
  ],
  items: [
    {
      xtype: 'documentmotionsingrid'
    }
  ],

  initComponent: function() {
    this.callParent();
    var self = this;
    var grid = this.down('documentmotionsingrid');
    var vm = grid.getViewModel();
    vm.bind('{activeMotion}', function(motion) {
      self.fireEvent('motionchanged', motion);
    });
  },

  getActiveMotion: function() {
    var grid = this.down('documentmotionsingrid');
    return grid.getActiveMotion();
  }

});