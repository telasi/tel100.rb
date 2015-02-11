/*
 * File: app/view/document/motions/Tree.js
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

Ext.define('Tel100.view.document.motions.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.documentmotionstree',

  requires: [
    'Tel100.view.document.motions.TreeViewModel',
    'Ext.tree.View',
    'Ext.tree.Column'
  ],

  viewModel: {
    type: 'documentmotionstree'
  },
  bodyCls: 'x-tree-noicon',
  autoLoad: true,
  enableColumnHide: false,
  hideHeaders: true,
  rowLines: true,
  lines: false,
  useArrows: true,

  bind: {
    title: '{i18n.document.motion.tree}',
    store: '{motions}'
  },
  viewConfig: {

  },
  columns: [
    {
      xtype: 'treecolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.get('root')) {
          var grid = view.up('documentmotionstree');
          var vm = grid.getViewModel();
          var doc = vm.get('document');

          debugger;

          return doc.get('docnumber');
        } else {
          return value;
        }
      },
      dataIndex: 'receiver',
      text: 'Receiver',
      flex: 1
    }
  ]

});