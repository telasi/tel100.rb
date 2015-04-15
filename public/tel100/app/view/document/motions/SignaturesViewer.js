/*
 * File: app/view/document/motions/SignaturesViewer.js
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

Ext.define('Tel100.view.document.motions.SignaturesViewer', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionssignaturesviewer',

  requires: [
    'Tel100.view.document.motions.SignaturesViewerViewModel',
    'Tel100.view.document.motions.SignaturesViewerViewController',
    'Ext.grid.column.Column',
    'Ext.grid.View',
    'Ext.panel.Tool'
  ],

  controller: 'documentmotionssignaturesviewer',
  viewModel: {
    type: 'documentmotionssignaturesviewer'
  },
  hideHeaders: true,
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.signatures} ({signatureCount})',
    store: '{signatures}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var status = record.get('status');
        var decor = helpers.document.status.statusDecoration(status);
        var text = '<strong>' + value + '</strong>';
        if (record.get('role') === 'author') {
          text += ' <i class="fa fa-legal"></i>';
        } else {
          text += ' <i class="fa fa-edit"></i>';
        }
        var date = record.get('date');
        if (date) { text = text + ' &mdash; ' + date; }
        return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        text,
        '</span>'
        ].join('');
      },
      dataIndex: 'name',
      text: 'name',
      flex: 1
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    }
  ],

  onRefresh: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  refresh: function() {
    this.getStore().load();
  },

  onStoreLoad: function(store, records, successful, eOpts) {
    var vm = this.getViewModel();
    vm.set('signatureCount', store.count());
  }

});