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
    'Tel100.view.document.motions.Grid',
    'Tel100.view.document.motions.Editor',
    'Ext.grid.Panel',
    'Ext.panel.Tool'
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
  items: [
    {
      xtype: 'documentmotionsgrid',
      data: {
        outmode: true,
        basemotion: false
      },
      flex: 2,
      region: 'center',
      bind: {
        store: '{motions}'
      }
    },
    {
      xtype: 'documentmotionseditor',
      flex: 1,
      region: 'south',
      split: true
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    },
    {
      xtype: 'tool',
      type: 'plus',
      bind: {
        tooltip: '{i18n.document.motion.addReceiver}'
      },
      listeners: {
        click: {
          fn: 'onAddReceiver',
          scope: 'controller'
        }
      }
    }
  ],

  onRefresh: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  refresh: function() {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var parent = vm.get('parent');
    var params = { document_id: document.id, mode: 'out' };
    if (parent && parent.id) { params.parent_id = parent.id; }
    var grid = this.down('documentmotionsgrid');
    grid.getStore().load({ params: params, callback: function() {
      grid.setLoading(false);
    } });
    grid.setLoading(true);
  }

});