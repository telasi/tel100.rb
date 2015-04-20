/*
 * File: app/view/document/grid/Panel.js
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

Ext.define('Tel100.view.document.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentgridpanel',

  requires: [
    'Tel100.view.document.grid.PanelViewModel',
    'Tel100.view.document.grid.PanelViewController',
    'Ext.grid.View',
    'Ext.grid.plugin.DragDrop',
    'Ext.util.Point',
    'Ext.grid.column.Column'
  ],

  controller: 'documentgridpanel',
  viewModel: {
    type: 'documentgridpanel'
  },
  border: false,
  enableColumnHide: false,
  enableColumnMove: false,
  sortableColumns: false,
  defaultListenerScope: true,

  bind: {
    store: '{documents}'
  },
  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store) {
      var status = record.get('status');
      var statusClass = helpers.document.status.documentStatusRowClass(status, record);
      var isChanged = record.get('is_changed');
      if (isChanged) {
        return statusClass + ' text-unread';
      } else {
        return statusClass;
      }
    },
    plugins: [
      {
        ptype: 'gridviewdragdrop',
        pluginId: 'draganddropplug',
        ddGroup: 'Grid2FolderDDGroup',
        enableDrop: false
      }
    ]
  },
  columns: [
    {
      xtype: 'gridcolumn',
      dataIndex: 'docnumber',
      lockable: false,
      bind: {
        text: '{i18n.document.base.docnumber}'
      }
    },
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.get('as_signee') === 1) {
          return '<strong class="text-danger">' + i18n.document.comment.actions.sign +'</strong>';
        } else if (record.get('as_author') === 1) {
          return '<strong class="text-danger">' + i18n.document.comment.actions.author +'</strong>';
        }
      },
      lockable: false,
      bind: {
        text: '{i18n.document.base.actions}'
      }
    },
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var mystat = helpers.document.user.myStatus(record);
        var iconText;
        if (mystat.unread) {
          iconText = '<i class="fa fa-circle text-danger"></i>';
        } else {
          iconText = '<i class="fa ' + mystat.icon + '"></i>';
        }
        return [
        '<span class="' + mystat.style + '">',
        iconText + ' ',
        mystat.name,
        '</span>'
        ].join('');
      },
      bind: {
        text: '{i18n.document.base.my_status}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 130,
      dataIndex: 'statusName',
      bind: {
        text: '{i18n.document.base.status}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'docdate',
      formatter: 'date("d/m/Y")',
      bind: {
        text: '{i18n.document.base.docdate}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'typeName',
      bind: {
        text: '{i18n.document.base.type}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'directionName',
      bind: {
        text: '{i18n.document.base.direction}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 300,
      dataIndex: 'subject',
      bind: {
        text: '{i18n.document.base.subject}'
      }
    },
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var itemcount = 3;
        var text = [];
        var tooltip = "";
        for(var i = 0; i < value.length; i++) {
          var assignee = value[i];
          if(i < itemcount-1){
            var decor = helpers.document.status.statusDecoration(assignee.status);
            text.push([
            '<span class="' + decor.style + '">',
            '<i class="fa ' + decor.icon + '"></i> ',
            assignee.author,
            //( assignee.response ? ' &mdash; ' + assignee.response : '' ),
            '</span>'
            ].join(''));
          }

          if(i == itemcount - 1){
            text.push('(სულ ' + value.length + ')');
          }

          tooltip += assignee.author + '; ';
        }

        metaData.tdAttr = 'data-qtip="' + tooltip + '"';
        //return '<div title="'+ tooltip + '" style="white-space: normal">' + text.join('; <br>') + '</div>';
        return text.join('; <br>');
      },
      width: 250,
      cellWrap: true,
      dataIndex: 'assignees',
      bind: {
        text: '{i18n.document.base.assignees}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'original_number',
      bind: {
        text: '{i18n.document.base.original_number}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'original_date',
      formatter: 'date("d/m/Y")',
      bind: {
        text: '{i18n.document.base.original_date}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 200,
      dataIndex: 'sender_name',
      bind: {
        text: '{i18n.document.base.sender_name}'
      }
    }
  ],
  listeners: {
    beforeitemcontextmenu: {
      fn: 'onGridpanelBeforeItemContextMenu',
      scope: 'controller'
    },
    afterrender: {
      fn: 'onGridpanelAfterRender',
      scope: 'controller'
    },
    celldblclick: 'onGridpanelCellDblClick'
  },

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var actionIndex = 1; // index of sign column
    if (cellIndex === actionIndex && record.get('as_signee') === 1) {
      this.fireEvent('documentsign', record);
    } else if (cellIndex === actionIndex && record.get('as_author') === 1) {
      this.fireEvent('documentauthor', record);
    } else {
      this.fireEvent('documentopen', record);
    }
  },

  refresh: function(opts) {
    var grid = this;
    var store = grid.getStore();
    store.load(opts);
  }

});