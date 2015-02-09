/*
 * File: app/view/document/folder/Panel.js
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

Ext.define('Tel100.view.document.folder.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentfolderpanel',

  requires: [
    'Tel100.view.document.folder.PanelViewModel',
    'Tel100.view.document.folder.PanelViewController',
    'Ext.grid.column.Column',
    'Ext.grid.feature.Grouping',
    'Ext.XTemplate'
  ],

  controller: 'documentfolderpanel',
  viewModel: {
    type: 'documentfolderpanel'
  },
  width: 300,
  hideHeaders: true,

  bind: {
    title: '{i18n.document.folder.ui.folders}',
    store: '{folders}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      dataIndex: 'name',
      flex: 1
    }
  ],
  features: [
    {
      ftype: 'grouping',
      groupByText: 'category',
      groupHeaderTpl: Ext.create('Ext.XTemplate', 
        '{name:this.categoryName} ',
        '<tpl for=".">',
        '  <tpl if="name == \'b\'">',
        '    <span style="float:right">',
        '      <input type="button" value=\'+\'>',
        '      <input type="button" value=\'-\'>',
        '    </span></div>',
        '  </tpl>',
        '</tpl>',
        {
          categoryName: function(name) {
            return i18n.document.folder.categories[name];
          }
        }
      )
    }
  ],
  listeners: {
    groupclick: 'onGridpanelGroupClick'
  }

});