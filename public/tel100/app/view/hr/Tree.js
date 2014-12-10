/*
 * File: app/view/hr/Tree.js
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

Ext.define('Tel100.view.hr.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hrTree',

  requires: [
    'Tel100.view.hr.TreeViewModel',
    'Tel100.view.hr.TreeViewController',
    'Ext.tree.View',
    'Ext.tree.Column'
  ],

  controller: 'hrtree',
  viewModel: {
    type: 'hrtree'
  },
  bodyCls: 'x-tree-noicon',
  title: 'My Tree Panel',
  hideHeaders: true,
  store: 'hr.Tree',

  viewConfig: {

  },
  columns: [
    {
      xtype: 'treecolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // var isManager = record.get('manager') === 1;
        // var icon = '<i class="fa fa-' + record.get('image') + '"></i>';
        // var name = value;
        // var type = record.get('type');
        // if (type === 'HR::Employee') {
        //   var hasUser = record.get('has_user');
        //   var organization = record.get('organization');
        //   var isManager = record.get('is_manager') === 1;
        //   if (!hasUser) { icon = '<span class="text-danger"><i class="fa fa-circle"></i></span>'; }
        //   if (isManager) { name += ' <strong class="label label-success">' + Helpers.i18n().employee.is_manager + '</strong>'; }
        //   name += ' <span class="text-muted">' + organization + '</span>';
        // }
        // return [icon,name].join(' ');
        if (record.toHRTreeHtml) {
          return record.toHRTreeHtml();
        } else {
          //   debugger;
          return 'JSC Telasi';
        }
      },
      dataIndex: 'name',
      flex: 1
    }
  ],
  listeners: {
    beforerender: 'onBeforeRender'
  }

});