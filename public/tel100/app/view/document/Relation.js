/*
 * File: app/view/document/Relation.js
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

Ext.define('Tel100.view.document.Relation', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentrelation',

  requires: [
    'Tel100.view.document.RelationViewModel',
    'Ext.grid.Panel',
    'Ext.grid.column.Column',
    'Ext.grid.View',
    'Ext.panel.Tool',
    'Tel100.view.document.Search'
  ],

  viewModel: {
    type: 'documentrelation'
  },
  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.relation.relations} ({relationCount})'
  },
  items: [
    {
      xtype: 'gridpanel',
      hideHeaders: true,
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'docnumber',
          text: 'document',
          flex: 1
        }
      ]
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'plus',
      listeners: {
        click: 'onAddRelation'
      }
    },
    {
      xtype: 'tool',
      type: 'refresh'
    }
  ],

  onAddRelation: function(tool, e, owner, eOpts) {
    if (!this.searchDialog) {
      this.searchDialog = Ext.create('Tel100.view.document.Search', {
        closeAction: 'hide',
        modal: true,
        maximizable: true
      });
    }
    var vm = this.getViewModel();
    this.searchDialog.setParentDocument(vm.get('document'));
    this.searchDialog.show();
  }

});